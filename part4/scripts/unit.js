var resultText = document.getElementById('c-value');
var originalText = document.getElementById('o-value');
var formElements = document.getElementsByClassName("form-element");
var measureType = document.getElementById("unit-type");
var unit1 = document.getElementById("unit-value-1");
var unit2 = document.getElementById("unit-value-2");
var optGroupLength = document.getElementsByClassName("unit-opt-l");
var optGroupWeight = document.getElementsByClassName("unit-opt-w");
var optGroupArea = document.getElementsByClassName("unit-opt-a");
var optGroupVolume = document.getElementsByClassName("unit-opt-v");
var type = 1;
var lastType = 1;

function hideOption(elements) {
    for (let i=0; i<elements.length; i++) {
        elements[i].setAttribute("hidden", "hidden");
    }
}

function showOption(elements) {
    for (let i=0; i<elements.length; i++) {
        elements[i].removeAttribute("hidden");
    }
}

measureType.addEventListener("change", ev => {
    type = measureType.selectedIndex;
    // Chang to default option to prevent error only in this case.
    if (lastType !== type && unit1.selectedIndex !== 0) {
        unit1.selectedIndex=0
    }
    if (lastType !== type && unit2.selectedIndex !== 0) {
        unit2.selectedIndex=0
    }
    lastType = type;

    switch (type) {
        case 1:
            console.log(type)
            showOption(optGroupLength);
            hideOption(optGroupWeight);
            hideOption(optGroupArea);
            hideOption(optGroupVolume);
            break;
        case 2:
            console.log(type)
            hideOption(optGroupLength);
            showOption(optGroupWeight);
            hideOption(optGroupArea);
            hideOption(optGroupVolume);
            break;
        case 3:
            console.log(type)
            hideOption(optGroupLength);
            hideOption(optGroupWeight);
            showOption(optGroupArea);
            hideOption(optGroupVolume);
            break;
        case 4:
            console.log(type)
            hideOption(optGroupLength);
            hideOption(optGroupWeight);
            hideOption(optGroupArea);
            showOption(optGroupVolume);
            break;
    }
})

for (let i=0; i< formElements.length; i++) {
    formElements[i].addEventListener("change", evt => {
        if (checkTextFieldValid('form-text-field') && checkSelectValid('form-select')) {
            console.log("All Valid")
            // get oValue, oUnit and cUnit:
            let oValue = parseInt(originalText.value);
            let oUnit = unit1.selectedIndex;
            let cUnit = unit2.selectedIndex;
            console.log("o:", oUnit, "c:", cUnit)
            switch (type) {
                case 1:
                    resultText.value = convertLength(oValue, oUnit, cUnit);
                    break;
                case 2:
                    resultText.value = convertWeight(oValue, oUnit, cUnit);
                    break;
                case 3:
                    resultText.value = convertArea(oValue, oUnit, cUnit);
                    break;
                case 4:
                    resultText.value = convertVolume(oValue, oUnit, cUnit)
                    break;
            }
        }
    })
}

function convertLength(oValue, oUnit, cUnit) {
    if (oUnit===1) { //km
        switch (cUnit) {
            case 1: //km
                return oValue;
            case 2: //m
                return oValue*1000;
            case 3: //cm
                return oValue*1000*100;
            case 4: //mm
                return oValue*1000*1000;
            case 5: //um
                return oValue*1000*1000*1000;
            case 6: //nm
                return oValue*1000*1000*1000*1000;
            case 7: //in
                return oValue*39370.1;
            case 8: //ft
                return oValue*3280.84;
            case 9: //mi
                return oValue*0.621371;
        }
    } else {
        switch (oUnit) {
            case 2: //m
                return convertLength(oValue/1000, 1, cUnit);
            case 3: //cm
                return convertLength(oValue/1000/100, 1, cUnit);
            case 4: //mm
                return convertLength(oValue/1000/1000, 1, cUnit);
            case 5: //um
                return convertLength(oValue/1000/1000/1000, 1, cUnit);
            case 6: //nm
                return convertLength(oValue/1000/1000/1000/1000, 1, cUnit);
            case 7: //in
                return convertLength(oValue/1000*0.0254, 1, cUnit);
            case 8: //ft
                return convertLength(oValue*0.0003048, 1, cUnit);
            case 9: //mi
                return convertLength(oValue*1.6093435, 1, cUnit);
        }

    }
}

function convertWeight(oValue, oUnit, cUnit) {
    if (oUnit===10) { //tonne
        switch (cUnit) {
            case 10: //tonne
                return oValue;
            case 11: //kg
                return oValue*1000;
            case 12: //g
                return oValue*1000*1000;
            case 13: //i-ton
                return oValue*0.984207;
            case 14: //us-ton
                return oValue*1.10231;
            case 15: //pound
                return oValue*2204.62;
            case 16:
                return oValue*35274;
        }
    } else {
        switch (oUnit) {
            case 11: //kg
                return convertWeight(oValue/1000, 10, cUnit);
            case 12: //g
                return convertWeight(oValue/1000/1000, 10, cUnit);
            case 13: //i-ton
                return convertWeight(oValue*1.01605, 10, cUnit);
            case 14: //us-ton
                return convertWeight(oValue*0.907185, 10, cUnit);
            case 15: //pound
                return convertWeight(oValue*0.000453592, 10, cUnit);
            case 16: //ounce
                return convertWeight(oValue/1000*0.0283495, 10, cUnit);
        }
    }
}

function convertArea(oValue, oUnit, cUnit) {
    if (oUnit===17) { // m2
        switch (cUnit) {
            case 17: //m2
                return oValue;
            case 18: //km2
                return oValue/1000/1000;
            case 19: //in2
                return oValue*1550;
            case 20: //ft2
                return oValue*10.7639;
            case 21: //ac
                return oValue*0.000247105;
            case 22: //hec
                return oValue/10000;
            case 23: //mi2
                return oValue*0.386102/1000/1000;
        }
    } else {
        switch (oUnit) {
            case 18: //km2
                return convertArea(oValue*1000*1000, 17, cUnit);
            case 19: //in2
                return convertArea(oValue*0.00064516, 17, cUnit);
            case 20: //ft2
                return convertArea(oValue*0.092903, 17, cUnit);
            case 21: //ac
                return convertArea(oValue*4046.86, 17, cUnit);
            case 22: //hec
                return convertArea(oValue*10000, 17, cUnit);
            case 23: //mi2
                return convertArea(oValue*2.59*1000*1000, 17, cUnit);
        }
    }
}

function convertVolume(oValue, oUnit, cUnit) {
    if (oUnit === 24) { //L
        switch (cUnit) {
            case 24: //L
                return oValue;
            case 25: //ml
                return oValue * 1000;
            case 26: //m3
                return oValue / 1000;
            case 27: //ft3
                return oValue * 0.0353147;
            case 28: //in3
                return oValue * 61.0237;
            case 29: //i-gallon
                return oValue * 0.219969;
            case 30: // us-liquid-gallon
                return oValue * 0.264172;
        }
    } else {
        switch (oUnit) {
            case 25: //ml
                return convertVolume(oValue/1000, 24, cUnit);
            case 26: //m3
                return convertVolume(oValue*1000, 24, cUnit);
            case 27: //ft3
                return convertVolume(oValue*28.3168, 24, cUnit);
            case 28: //in3
                return convertVolume(oValue*0.0163871, 24, cUnit);
            case 29: //i-gallon
                return convertVolume(oValue*4.54609, 24, cUnit);
            case 30: // us-liquid-gallon
                return convertVolume(oValue*3.78541, 24, cUnit);
        }
    }
}
