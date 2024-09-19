// script.js

// Variables to store the current value and operation details
let currentInput = "";
let firstNumber = null;
let operator = null;

// Functions for basic operations
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
  if (b === 0) {
    alert("Error: Cannot divide by 0");
    return null;
  }
  return a / b;
}

// Function to perform the selected operation
function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      return null;
  }
}

// Function to update the display
function updateDisplay() {
  document.querySelector("#display p").textContent = currentInput || "0";
}

// Add event listeners to number buttons
document.querySelectorAll(".numBtn").forEach((button) => {
  button.addEventListener("click", function () {
    if (currentInput === "0" || currentInput === "") {
      currentInput = this.textContent;
    } else {
      currentInput += this.textContent;
    }
    updateDisplay();
  });
});

// Add event listeners to operator buttons
document.querySelectorAll(".oprBtn").forEach((button) => {
  button.addEventListener("click", function () {
    if (currentInput === "") return; // No action if no input

    if (firstNumber === null) {
      // Store the first number and the operator
      firstNumber = parseFloat(currentInput);
      operator = this.textContent;
      currentInput = "";
    } else if (operator !== null) {
      // Perform calculation with the current number and operator
      const result = operate(firstNumber, parseFloat(currentInput), operator);
      if (result !== null) {
        // Update the display with the result and prepare for next operation
        currentInput = result.toString();
        firstNumber = result;
        operator = this.textContent; // Set new operator
        updateDisplay();
      }
    }
  });
});

// Add event listener for equals button
document.getElementById("btn-equals").addEventListener("click", function () {
  if (firstNumber !== null && operator !== null && currentInput !== "") {
    // Perform the final calculation and display the result
    const result = operate(firstNumber, parseFloat(currentInput), operator);
    if (result !== null) {
      currentInput = result.toString();
      firstNumber = null;
      operator = null;
      updateDisplay();
    }
  }
});

// Add event listener for clear button
document.getElementById("btn-clear").addEventListener("click", function () {
  // Reset all variables and update the display
  currentInput = "";
  firstNumber = null;
  operator = null;
  updateDisplay();
});

// Initialize display
updateDisplay();
