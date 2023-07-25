var loanAmountText = document.getElementById('loan_amount_input');
var downPaymentText = document.getElementById('down_payment_amount_input');
var monthText = document.getElementById('month_input');
var interestText = document.getElementById('ir-input');
var freqSelect = document.getElementById('payment-frequency-select');
var resText = document.getElementById('mortgage-results-value');

var formElementsMortgage = document.getElementsByClassName("form-element");


for (let i=0; i<formElementsMortgage.length; i++) {
    formElementsMortgage[i].addEventListener("change", evt => {
        if(checkTextFieldValid('form-text-field') && checkSelectValid('form-select')) {
            calculateMortgage();
        }
    })
}

function calculateMortgage() {
    let loanAmount = parseInt(loanAmountText.value);
    let downPayment = parseInt(downPaymentText.value);
    let month = parseInt(monthText.value);
    let interest = parseInt(interestText.value);
    let freq = freqSelect.selectedIndex;
    let factor = 1;
    let payment = ((loanAmount-downPayment)*(interest/100/12)*(Math.pow(1+interest/100/12, month))) / (Math.pow(1+interest/100/12, month)-1)
    let method;
    console.log(loanAmount, downPayment, month, interest, freq)
    switch (freq) {
        case 1: // monthly, factor = 12
            factor = 12;
            method = "monthly "
            payment = payment*12/factor;
            break;
        case 2: // biweekly, factor = 26
            factor = 26;
            payment = payment*12/factor;
            method = "biweekly "
            break;
        case 3: // weekly, factor = 52
            factor = 52;
            payment = payment*12/factor;
            method = "weekly "
            break;
    }

    resText.innerHTML = "Your " + method + "payment is $" + payment.toFixed(2) + ".";

}