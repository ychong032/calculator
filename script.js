function add(a, b) {
    return parseFloat((a + b).toFixed(5));
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(5));
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(5));
}

function divide(a, b) {
    if (b === 0) {
        alert("Cannot divide by 0!");
        return;
    }
    return parseFloat((a / b).toFixed(5));
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
    if (displayValue === "0" && !isOperator(e.target.textContent)) {
        displayValue = e.target.textContent;
        currentOperand = displayValue;
    } else if (displayValue.split(" ")[2] === "0") {
        displayValue = displayValue.substring(0, displayValue.length - 1) + e.target.textContent;
        currentOperand = e.target.textContent;
    } else {
        displayValue += e.target.textContent;
        if (!isOperator(e.target.textContent)) {
            currentOperand += e.target.textContent;
        }
    }
    result.textContent = displayValue;
}

function clearDisplay() {
    expression.textContent = "";
    result.textContent = "0";
    displayValue = "0";
    currentOperand = "0";
    delete operation.a;
    delete operation.op;
    delete operation.b;
}

function inputOperator(e) {
    if ("a" in operation && "op" in operation) {
        if (displayValue.charAt(displayValue.length - 1) === " ") {
            displayValue = `${operation.a}`;
            operation.op = e.target.textContent.trim();
        } else {
            let intermediateResult = operate(operation.op, operation.a, parseFloat(currentOperand));
            if (intermediateResult === undefined) {
                return;
            }
            operation.a = intermediateResult;
            operation.op = e.target.textContent.trim();
            currentOperand = "0";
            expression.textContent = `Ans = ${intermediateResult}`;
            displayValue = `${intermediateResult}`;
        }
        displayInput(e);
    } else {
        operation.a = parseFloat(currentOperand);
        operation.op = e.target.textContent.trim();
        currentOperand = "0";
        displayInput(e);
    }
}

function computeResult(e) {
    if (currentOperand === "0") {
        return;
    } else if (operation.op === undefined) {
        expression.textContent = `Ans = ${currentOperand}`;
        return;
    }
    let computed = operate(operation.op, operation.a, parseFloat(currentOperand));
    if (computed === undefined) {
        return;
    }
    displayInput(e);
    expression.textContent = displayValue;
    displayValue = computed.toString();
    currentOperand = displayValue;
    result.textContent = displayValue;
    delete operation.a;
    delete operation.op;
    delete operation.b;
}

function isOperator(char) {
    return isNaN(parseFloat(char));
}

function inputDecimal() {
    if (!currentOperand.includes(".")) {
        displayValue += ".";
        currentOperand += ".";
        result.textContent = displayValue;
    }
}

let displayValue = "0";
let currentOperand = "0";
let operation = {};
let lastComputed = "";
const result = document.querySelector("#result");
const expression = document.querySelector("#expression");
const operandButtons = document.querySelectorAll("button.operand");
const operatorButtons = document.querySelectorAll("button.operator")
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const ansButton = document.querySelector("#ans");
const decimalButton = document.querySelector("#decimal");

operandButtons.forEach(item => item.addEventListener("click", displayInput));
operatorButtons.forEach(item => item.addEventListener("click", inputOperator));
clearButton.addEventListener("click", clearDisplay);
equalButton.addEventListener("click", computeResult);
// TODO: implement decimal feature
// TODO: implement backspace feature
// TODO: implement Ans feature
// TODO: implement keyboard support
// TODO: implement negate feature
// TODO: change operator symbols
// TODO: improve aesthetic
decimalButton.addEventListener("click", inputDecimal);