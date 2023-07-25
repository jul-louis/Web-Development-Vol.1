let playerMenu = document.getElementById("player-menu");
let player = document.getElementById("player");
const toggle = document.getElementById("toggle");
let caption = document.getElementById("caption");
const canvas = document.getElementById("res-canvas");
let showPage = document.getElementById("show-page");
let backCover = document.getElementById("back-cover");

backCover.addEventListener("click", ev => {
  showElement(showPage)
})

showPage.addEventListener("click", ev => {
    hideElement(showPage)
})

playerMenu.addEventListener("mouseover", ev => {
    if (player.style.visibility === "visible") {
        hideElement(player)
    } else {
        toggle.style.display = "block"
        showElement(player)
    }
})

player.addEventListener("mouseover", ev => {
    player.style.visibility = "visible"
    player.style.opacity = "1"
})

player.addEventListener("mouseout", ev => {
    hideElement(player)
})

canvas.addEventListener("mouseover", ev => {
    showElement(caption)
});

caption.addEventListener("mouseover", ev => {
    caption.style.visibility = "visible"
    caption.style.opacity = "1"
})

canvas.addEventListener("mouseout", ev => {
    hideElement(caption)
});

function showElement(element) {
    element.style.transition = "visibility 0s, opacity 0.3s";
    element.style.visibility = "visible"
    element.style.opacity = "1"
}

function hideElement(element) {
    element.style.transition = "visibility 0s linear 0.3s, opacity 0.3s";
    element.style.visibility = "hidden"
    element.style.opacity = "0"
}