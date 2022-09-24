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

function convertOperatorSymbol(symbol) {
    switch (symbol) {
        case "+":
            return "+";
        case "-":
            return "-";
        case "\u00d7":
            return "*";
        case "\u00f7":
            return "/";
    }
}

function operate(operator, a, b) {
    let symbol = convertOperatorSymbol(operator);
    switch (symbol) {
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
    } else if (displayValue.split(" ")[2] === "0" && !isOperator(e.target.textContent)) {
        displayValue = displayValue.substring(0, displayValue.length - 1) + e.target.textContent;
        currentOperand = e.target.textContent;
    } else {
        displayValue += e.target.textContent;
        if (!isOperator(e.target.textContent)) {
            currentOperand += e.target.textContent;
        }
    }
    result.textContent = displayValue;
    if (expression.textContent !== "") {
        expression.textContent = `Ans = ${lastComputed}`;
    }
}

function clearDisplay() {
    expression.textContent = "";
    result.textContent = "0";
    displayValue = "0";
    currentOperand = "0";
    clearOperation();
}

function inputOperator(e) {
    if ("a" in operation && "op" in operation) {
        if (displayValue.slice(-1) === " ") {
            displayValue = `${operation.a}`;
            operation.op = e.target.textContent.trim();
        } else {
            let intermediateResult = operate(operation.op, operation.a, parseFloat(currentOperand));
            if (intermediateResult === undefined) {
                return;
            }
            lastComputed = intermediateResult;
            operation.a = lastComputed;
            operation.op = e.target.textContent.trim();
            currentOperand = "0";
            expression.textContent = `Ans = ${lastComputed}`;
            displayValue = `${lastComputed}`;
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
    if (currentOperand === "-") {
        return;
    } else if (operation.op === undefined) {
        expression.textContent = `Ans = ${currentOperand}`;
        lastComputed = currentOperand;
        return;
    }
    let computed = operate(operation.op, operation.a, parseFloat(currentOperand));
    if (computed === undefined) {
        return;
    }
    lastComputed = computed;
    if (displayValue.slice(-1) === " ") {
        displayValue += "0";
    }
    displayInput(e);
    expression.textContent = displayValue;
    displayValue = computed.toString();
    currentOperand = displayValue;
    result.textContent = displayValue;
    clearOperation();
}

function isOperator(char) {
    return isNaN(parseFloat(char));
}

function inputDecimal() {
    if (!currentOperand.includes(".")) {
        displayValue += ".";
        currentOperand += ".";
        result.textContent = displayValue;
        if (expression.textContent !== "") {
            expression.textContent = `Ans = ${lastComputed}`;
        }
    }
}

function backspace() {
    let lastChar = displayValue.slice(-1)
    if (lastChar === " ") {
        displayValue = displayValue.slice(0, -3);
        currentOperand = displayValue;
        clearOperation();
    } else {
        displayValue = displayValue.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    }

    if (displayValue.length === 0) {
        displayValue = "0";
        currentOperand = "0";
    }

    result.textContent = displayValue;
}

function clearOperation() {
    delete operation.a;
    delete operation.op;
    delete operation.b;
}

function keyboardInput(e) {
    if (e.shiftKey) {
        const pressedButton = document.querySelector(`button[data-key="${e.key}"]`);
        if (pressedButton) {
            const event = new Event("click");
            pressedButton.dispatchEvent(event);
        }
    } else {
        const pressedButton = document.querySelector(`button[data-key="${e.keyCode}"]`);
        if (pressedButton) {
            const event = new Event("click");
            pressedButton.dispatchEvent(event);
        }
    }
}

let displayValue = "0";
let currentOperand = "0";
let operation = {};
let lastComputed = "0";
const result = document.querySelector("#result");
const expression = document.querySelector("#expression");
const operandButtons = document.querySelectorAll("button.operand");
const operatorButtons = document.querySelectorAll("button.operator")
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const decimalButton = document.querySelector("#decimal");
const deleteButton = document.querySelector("#delete");

operandButtons.forEach(item => item.addEventListener("click", displayInput));
operatorButtons.forEach(item => item.addEventListener("click", inputOperator));
clearButton.addEventListener("click", clearDisplay);
equalButton.addEventListener("click", computeResult);
// TODO: implement negate feature
// TODO: change operator symbols
// TODO: improve aesthetic
// TODO: add visual effects when pressing equal
decimalButton.addEventListener("click", inputDecimal);
deleteButton.addEventListener("click", backspace);
window.addEventListener("keydown", keyboardInput);