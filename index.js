const precision = 2;
let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;

function add(a, b) {
    return parseFloat((a + b).toFixed(precision));
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(precision));
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(precision));
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    } else {
        return parseFloat((a / b).toFixed(precision));
    }
}

function operate(inputs) {
    const num1 = parseFloat(inputs[0]);
    const num2 = parseFloat(inputs[1]);
    const operator = inputs[2];
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            console.log(`No operators matched '${operator}'`);
            return null;
    }
}

// Clear the body content and styles
document.body.innerHTML = '';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.boxSizing = 'border-box';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.height = '100vh';
// Remove the background color from the body
// document.body.style.backgroundColor = '#2f2f2f';

// Create the calculator container
const calculatorContainer = document.createElement('div');
calculatorContainer.classList.add('calculator');

// Set the calculator size to take up 1/6 of the viewport area
const displayNumerator=6.5;
const displayDenominator=10;
const displayPercentage=Math.round(
    Math.sqrt(displayNumerator/displayDenominator)*10**4)/(10**2);
console.log(displayPercentage);
calculatorContainer.style.width = `${displayPercentage}vw`; // Approximately sqrt(1/6) * 100vw
calculatorContainer.style.height = `${displayPercentage}vh`; // Approximately sqrt(1/6) * 100vh

// Add padding and box-sizing to the calculator container
calculatorContainer.style.padding = '30px';
calculatorContainer.style.boxSizing = 'border-box';

// Center the calculator container
calculatorContainer.style.display = 'flex';
calculatorContainer.style.flexDirection = 'column';
calculatorContainer.style.justifyContent = 'space-between'; // Evenly distribute space
calculatorContainer.style.alignItems = 'center';

// Set background color only for the calculator container
calculatorContainer.style.backgroundColor = '#2f2f2f';
calculatorContainer.style.borderRadius = '20px'; // Optional: Add rounded corners to the calculator frame
calculatorContainer.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.2)'; // Optional: Add shadow for better visibility

document.body.appendChild(calculatorContainer);

const buttonText = [
    'AC', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
];

let buttonIterator = 0;

// Use percentages for sizes relative to the calculator container
const baseWidthPercent = 23; // Each button or display will take up a percentage of the container width
const baseHeightPercent = 14; // Adjusted to fit within the container with padding

// Adjust the total height percentage to account for the padding
const totalRows = 6; // One display row + five button rows
const totalHeightPercent = 100 - ((30 / (calculatorContainer.clientHeight)) * 100 * 2); // Subtract padding percentage from 100%

// Create the display
const displayDiv = document.createElement('div');
displayDiv.style.width = '100%';
displayDiv.style.height = `${baseHeightPercent}%`;
displayDiv.style.display = 'flex';
displayDiv.style.flexDirection = 'row';
displayDiv.style.justifyContent = 'flex-end';
displayDiv.style.alignItems = 'center';
displayDiv.style.backgroundColor = '#b2b9b7';
displayDiv.style.borderRadius = '20px';
displayDiv.style.marginBottom = '2%';
displayDiv.style.padding = '2%';
displayDiv.style.boxSizing = 'border-box';

const displayElement = document.createElement('p');
displayElement.style.backgroundColor = '#b2b9b7';
displayElement.textContent = displayValue;
displayElement.style.textAlign = 'right';
displayElement.style.fontSize = '2rem'; // Adjusted for responsive sizing
displayElement.style.margin = '0';
displayElement.style.padding = '0';
displayElement.style.width = '100%';
displayElement.style.overflow = 'hidden';
displayElement.style.wordWrap = 'break-word';
displayElement.style.borderRadius='20px';

displayDiv.appendChild(displayElement);
calculatorContainer.appendChild(displayDiv);

// Create the buttons
for (let i = 0; i < 5; i++) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexDirection = 'row';
    row.style.justifyContent = 'space-between';
    row.style.alignItems = 'center';
    row.style.width = '100%';
    row.style.height = `${baseHeightPercent}%`;
    row.style.boxSizing = 'border-box';

    for (let j = 0; j < 4; j++) {
        if (buttonIterator >= buttonText.length) break;

        const button = document.createElement('button');
        button.textContent = buttonText[buttonIterator++];

        // Button styles
        button.style.width = `${baseWidthPercent}%`;
        button.style.height = '100%';
        button.style.borderRadius = '15px';
        button.style.margin = '1%';
        button.style.fontSize = '1.5rem'; // Adjusted for responsive sizing
        button.style.flexGrow = '1';
        button.style.flexBasis = '0';
        button.style.border = 'none'; // Remove default button border
        button.style.color = '#fff'; // White text for better contrast

        // Assign colors based on button type
        if (i === 0 && j < 3) {
            button.style.backgroundColor = '#1e90ff';
        } else if (j === 3 || (i === 4 && j === 2)) {
            button.style.backgroundColor = '#ff8f1f';
        } else {
            button.style.backgroundColor = '#217c7e';
        }

        // Special styling for the '0' button
        if (button.textContent === '0') {
            button.style.width = `${baseWidthPercent * 2 + 2}%`; // Adjust for margin
            j++; // Skip the next slot since '0' occupies two slots
        }

        row.appendChild(button);
    }

    calculatorContainer.appendChild(row);
}

function isNumber(value) {
    return !isNaN(value) || value === '.';
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

function updateDisplay() {
    // Limit display to a certain number of digits
    if (displayValue.toString().length > 12) {
        displayValue = parseFloat(displayValue).toExponential(5);
    }
    displayElement.textContent = displayValue;
}

function handleNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        if (number === '.' && displayValue.includes('.')) {
            // Prevent multiple decimals
            return;
        }
        displayValue = displayValue === '0' && number !== '.' ? number : displayValue + number;
    }
    updateDisplay();
}

function handleOperator(operator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && waitingForSecondOperand) {
        currentOperator = operator;
        return;
    }

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (currentOperator) {
        const result = operate([firstOperand.toString(), inputValue.toString(), currentOperator]);
        if (result === 'Error') {
            displayValue = 'Error';
            updateDisplay();
            resetCalculator();
            return;
        }
        displayValue = result.toString();
        updateDisplay();
        firstOperand = result;
    }

    currentOperator = operator;
    waitingForSecondOperand = true;
}

function handleEquals() {
    if (!currentOperator) {
        return;
    }

    const inputValue = parseFloat(displayValue);

    if (waitingForSecondOperand) {
        secondOperand = firstOperand;
    } else {
        secondOperand = inputValue;
    }

    const result = operate([firstOperand.toString(), secondOperand.toString(), currentOperator]);
    if (result === 'Error') {
        displayValue = 'Error';
        updateDisplay();
        resetCalculator();
        return;
    }
    displayValue = result.toString();
    updateDisplay();
    firstOperand = result;
    currentOperator = null;
    waitingForSecondOperand = false;
}

function handleClear() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function handlePlusMinus() {
    if (displayValue !== '0') {
        displayValue = (parseFloat(displayValue) * -1).toString();
        updateDisplay();
    }
}

function handlePercent() {
    const value = parseFloat(displayValue);
    displayValue = (value / 100).toString();
    updateDisplay();
}

function resetCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
}

const buttons = calculatorContainer.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (isNumber(value)) {
            handleNumber(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        } else if (value === 'AC') {
            handleClear();
        } else if (value === '+/-') {
            handlePlusMinus();
        } else if (value === '%') {
            handlePercent();
        }
    });
});
