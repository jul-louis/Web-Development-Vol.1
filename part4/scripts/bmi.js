var ageText = document.getElementById("age_input");
var heightText = document.getElementById("height_input");
var heightFTText = document.getElementById("height_input-us-ft");
var heightInText = document.getElementById("height_input-us-in");
var weightText = document.getElementById("weight_input-kg");
var weightPoundText = document.getElementById("weight_input-p");
var metricsBox = document.getElementById("bmi-mt");
var metricsKgBox = document.getElementById("bmi-mt-kg");
var usFtBox = document.getElementById("bmi-us-ft");
var usInBox = document.getElementById("bmi-us-in");
var usPoundBox = document.getElementById("bmi-us-p");
var unitTypeToggle = document.getElementById("unit-input-bmi");
var unitTypeToggleText = document.getElementById("unit-input-bmi-text");
var resultValue = document.getElementById("bmi-results-value");
var resultAssess = document.getElementById("bmi-results-assess");
var clearButton = document.getElementById("clear-btn");
var isMetrics = true;

var formElementsBMI = document.getElementsByClassName("form-element");

for (let i=0; i< formElementsBMI.length; i++) {
    formElementsBMI[i].addEventListener("change", evt => {
        calculateBMI();
    })
}

function calculateBMI() {
    let age = parseInt(ageText.value)
    let result = 0;
    let rounded = 0;
    if (isMetrics) {
        console.log("mt")
        if (checkTextFieldValid('form-text-field')) {
            console.log("mt-yes")
            let height = parseInt(heightText.value)
            let weight = parseInt(weightText.value)
            result = weight/height/height*100*100;
            rounded = Math.round(result * 10) / 10
            resultValue.innerText = "Your BMI is " + rounded + " ."
            assessBMI(age, rounded);
        }
    } else {
        console.log("us")
        if (checkTextFieldValid('form-text-field-us')) {
            console.log("us-yes")
            let weight = parseInt(weightPoundText.value)
            let ft = parseInt(heightFTText.value)
            let inch = parseInt(heightInText.value)
            let height = inch + ft*12;
            let heightInMT = height * 2.54;
            let weightInMT = weight/2.205;
            result = weightInMT/heightInMT/heightInMT * 100 * 100;
            rounded = Math.round(result * 10) / 10
            resultValue.innerText = "Your BMI is " + rounded + " ."
            assessBMI(age, rounded);
        }
    }
}

function assessBMI(age, rounded) {
    let assess="";
    if (age >= 20) {
        assess += "As an adult (age >= 20), your BMI indicates that you are ";
        if (rounded < 16) {
            assess += "severely thin. "
        } else if (rounded < 17) {
            assess += "moderately thin. "
        } else if (rounded < 18.5) {
            assess += "mildly thin. "
        } else if (rounded < 25) {
            assess += "healthy in body weight. "
        } else {
            assess += "overweight. "
        }
    } else {
        assess += "As a child or teen (age <= 19), please check more information on CDC for more reliable assessment."
    }
    resultAssess.innerHTML = assess;
}

unitTypeToggle.addEventListener('change', ev => {
    isMetrics = !isMetrics
    if (isMetrics) {
        unitTypeToggleText.innerHTML = "Metrics Unit"
        hideElement(usInBox)
        hideElement(usFtBox)
        hideElement(usPoundBox)
        showElement(metricsBox)
        showElement(metricsKgBox)
    } else {
        unitTypeToggleText.innerHTML = "US Unit"
        showElement(usFtBox)
        showElement(usInBox)
        showElement(usPoundBox)
        hideElement(metricsBox)
        hideElement(metricsKgBox)
    }
})

function showElement(element) {
    element.style.transition = "visibility 0s, opacity 0.3s, height 0.3s";
    element.style.visibility = "visible"
    element.style.height = "fit-content"
    element.style.opacity = "1"
}

function hideElement(element) {
    element.style.transition = "visibility 0s linear 0.3s, opacity 0.3s, height 0.3s";
    element.style.visibility = "hidden"
    element.style.height = "0"
    element.style.opacity = "0"
}

clearButton.addEventListener("click", ev => {
    resultAssess.innerHTML="";
    resultValue.innerHTML="";
})