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
    if (displayValue === "0" && !isNaN(parseFloat(e.target.textContent))) {
        displayValue = e.target.textContent;
        currentOperand = displayValue;
    } else {
        displayValue = displayValue.concat(e.target.textContent);
        if (!isNaN(parseFloat(e.target.textContent))) {
            currentOperand = currentOperand.concat(e.target.textContent);
        }
    }
    result.textContent = displayValue;
}

function clearDisplay() {
    expression.textContent = "";
    result.textContent = "";
    displayValue = "0";
}

function inputOperator(e) {
    operation.a = parseFloat(currentOperand);
    currentOperand = "";
    operation.op = e.target.textContent.trim();
    displayInput(e);
}

function computeResult(e) {
    let computed = operate(operation.op, operation.a, parseFloat(currentOperand));
    displayInput(e);
    expression.textContent = displayValue;
    displayValue = computed.toString();
    currentOperand = displayValue;
    result.textContent = displayValue;
}

let displayValue = "0";
let currentOperand = "";
let operations = [];
let operation = {};
const result = document.querySelector("#result");
const expression = document.querySelector("#expression");
const operandButtons = document.querySelectorAll("button.operand");
const operatorButtons = document.querySelectorAll("button.operator")
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");

operandButtons.forEach(item => item.addEventListener("click", displayInput));
operatorButtons.forEach(item => item.addEventListener("click", inputOperator));
clearButton.addEventListener("click", clearDisplay);
equalButton.addEventListener("click", computeResult);