function loadTool(page) {
    let xHttpRequest = new XMLHttpRequest();
    xHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("tool-content").innerHTML = "";
            $('#tool-content').html(xHttpRequest.responseText);
            if (!hided) {
                hideGuide();
                hided = true;
            }
        }
    };
    xHttpRequest.open("GET", "tools/" + page + ".html", true);
    xHttpRequest.send();
}

function checkTextFieldValid(className) {
    let textFields = document.getElementsByClassName(className);
    let valid = true;
    for (let i = 0; i<textFields.length; i++) {
        let c = textFields[i].value;
        // console.log(c)
        if (c === "") {
            valid = false;
            break;
        } else if (isNaN(c)) {
            console.log("NaN")
            valid = false;
            break;
        }
    }
    return valid;
}

function checkSelectValid(className) {
    let selects = document.getElementsByClassName(className);
    let valid = true;
    for (let i=0; i<selects.length; i++) {
        // console.log(selects[i].selectedIndex)
        if (selects[i].selectedIndex === 0) {
            valid = false;
            break;
        }
    }
    return valid;
}


let hided = false;

function hideGuide() {
    document.getElementById("tool-guide").style.display = "none";
}