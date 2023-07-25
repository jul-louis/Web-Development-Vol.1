let images = [];
let interval, animation, intervalForAnimation;
let intervalMS = 2000;
let imageIndex = 0;
let started = false;
let paused = true;
let isSequential = true;
let isForward = true;
let transitionMode = 0;
let effectValue1 = 1;
let effectValue0 = 0;

const prevButton = document.getElementById('prev-button')
const nextButton = document.getElementById('next-button')
const playButton = document.getElementById('play-button')
const playText = document.getElementById('play-text')
const toggleText = document.getElementById('toggle-text')
const select = document.getElementById('select')
const directionToggle = document.getElementById('toggle-direction')
const directionToggleText = document.getElementById('toggle-text-direction')
const directionBox = document.getElementById('direction-box')

toggle.addEventListener('change', ev => {
    isSequential = !isSequential
    if (isSequential) {
        toggleText.innerHTML = "Sequential";
        showElement(directionBox)
        showElement(prevButton)
        showElement(nextButton)
    } else {
        toggleText.innerHTML = "Randomized";
        hideElement(directionBox)
        hideElement(prevButton)
        hideElement(nextButton)
    }
})

directionToggle.addEventListener('change', ev => {
    isForward = !isForward
    if (isForward) {
        directionToggleText.innerHTML = "Forward"
    } else {
        directionToggleText.innerHTML = "Backward"
    }
})

function loadImages() {
    $.ajax({
        url:'images.json',
        dataType: 'json',
        async: false,
        type: 'GET',
        success: function(data) {
            // console.log(data)
            let imgData = data['images']
            for (let i=0; i<imgData.length; i++) {
                let img = new Image();
                img.src = imgData[i]['src']
                img.caption = imgData[i]['caption']
                images.push(img)
            }
            // console.log(images)
        }
    })
}

function displayImageOnCanvas(index, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCaption(images[index]);
    if (transitionMode === 0) {
        // Plain Transition:
        context.globalAlpha = 1;
        context.filter = "grayscale(0)";
        if (started) {
            displayImage(images[index], context)
        } else {
            started = true;
            images[index].onload = function () {
                displayImage(images[index], context)
            }
        }
    } else if (transitionMode === 1) {
        context.globalAlpha = 1;
        context.filter = "grayscale(0) blur("+effectValue1*100+"px)";
        displayImage(images[index], context)
        displayEffect1(-0.1, 0, 1, index, context);
    } else if (transitionMode === 2) {
        context.globalAlpha = 1;
        context.filter = "grayscale("+effectValue1+")";
        displayImage(images[index], context)
        displayEffect1(-0.03, 0, 1, index, context);
    } else if (transitionMode === 3) {
        // Fade In Transition:
        context.filter = "grayscale(0)";
        context.globalAlpha = effectValue0;
        // console.log(effectValue0);
        displayImage(images[index], context)
        displayEffect0(0.02, 1, 1, index, context);
    }

}

function displayImage(img, context) {
    // console.log(img.width, img.height)
    let widthRatio = canvas.width/img.width;
    let heightRatio =  canvas.height/img.height  ;
    let ratio = Math.min (widthRatio, heightRatio);
    let xShiftCentre = (canvas.width - img.width*ratio)/2;
    let yShiftCentre = (canvas.height - img.height*ratio)/2;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height, xShiftCentre, yShiftCentre, img.width*ratio, img.height*ratio);
}

function displayEffect0(step, endValue, multiplier, index, context) {
    effectValue0 += step;
    if (effectValue0 < endValue) {
        window.clearInterval(intervalForAnimation);
        animation = requestAnimationFrame(function() {
            displayImageOnCanvas(index, context)
        });
    } else {
        effectValue0 = 0;
        if (!paused) {
            intervalForAnimation = window.setInterval(function() {
                updateImageIndex(isSequential, isForward)
                displayImageOnCanvas(index, context)
            }, 2000);
        }
    }
}

function displayEffect1(step, endValue, multiplier, index, context) {
    effectValue1 += step;
    if (effectValue1 > endValue) {
        window.clearInterval(intervalForAnimation);
        animation = requestAnimationFrame(function() {
            displayImageOnCanvas(index, context)
        });
    } else {
        effectValue1 = 1;
        if (!paused) {
            intervalForAnimation = window.setInterval(function() {
                updateImageIndex(isSequential, isForward)
                displayImageOnCanvas(index, context)
            }, 2000);
        }
    }
}

function setCaption(img) {
    caption.innerHTML = img.caption;
}

function increment(step) {
    imageIndex += step;
    imageIndex %= images.length;
    if (imageIndex<0) {
        imageIndex = images.length-1;
    }
    // console.log(imageIndex)
}

function autoPlay(context) {
    // console.log("Auto Enabled.")
    interval = window.setInterval(function () {
        updateImageIndex(isSequential, isForward)
        // console.log(imageIndex)
        displayImageOnCanvas(imageIndex, context)
    }, intervalMS)
}

function updateImageIndex(isSequential, isForward) {
    if (isSequential) {
        if (isForward) {
            increment(1);
        } else {
            increment(-1);
        }
    } else {
        let step = Math.floor(Math.random() * 10);
        // console.log(step)
        // console.log("current ii=", imageIndex)
        increment(step)
        // console.log("After random ii=", imageIndex)
    }
}

function displayNextImage(context) {
    increment(1);
    displayImageOnCanvas(imageIndex, context);
}

function displayPrevImage(context) {
    increment(-1);
    displayImageOnCanvas(imageIndex, context);
}

$(window).on('load', function() {
    select.selectedIndex = 0;
    const context = canvas.getContext('2d')
    loadImages()
    displayImageOnCanvas(imageIndex, context)
    prevButton.addEventListener('click', ev => {
        cancelAnimationFrame(animation)
        displayPrevImage(context)
    })
    nextButton.addEventListener('click', ev => {
        cancelAnimationFrame(animation)
        displayNextImage(context)
    })
    playButton.addEventListener('click', ev => {
        paused = !paused;
        if (!paused) {
            playText.innerHTML = "pause"
            autoPlay(context);
        } else {
            // console.log("Auto Disabled.")
            playText.innerHTML = "auto"
            window.clearInterval(interval)
        }
    })
    select.addEventListener('change', ev => {
        transitionMode = select.selectedIndex;
        if (!paused) {
            cancelAnimationFrame(animation)
            clearInterval(interval)
            interval = window.setInterval(function () {
                updateImageIndex(isSequential, isForward)
                // console.log(imageIndex)
                displayImageOnCanvas(imageIndex, context)
            }, intervalMS)
        }

    })

})

