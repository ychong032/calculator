function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function populateDisplay() {

}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            console.log("Something went wrong in operate()");
    }
}

function displayInput(e) {
    if (resultValue === "") {
        resultValue = e.target.textContent;
    } else {
        resultValue = resultValue.concat(e.target.textContent);
    }
    result.textContent = resultValue;
}

function clearDisplay() {
    expression.textContent = "";
    result.textContent = "";
    resultValue = "";
}

let resultValue = "";
const result = document.querySelector("#result");
const expression = document.querySelector("#expression");
const inputButtons = document.querySelectorAll("button.input");
const clearButton = document.querySelector("#clear");

inputButtons.forEach(item => item.addEventListener("click", displayInput));
clearButton.addEventListener("click", clearDisplay); 