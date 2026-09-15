/**
 * Browser-side calculator UI logic.
 * Kept separate from src/calculator.js (CommonJS / Node tests).
 */

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
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

const operations = {
  add,
  subtract,
  multiply,
  divide,
};

const firstInput = document.getElementById('first-number');
const secondInput = document.getElementById('second-number');
const resultEl = document.getElementById('result');
const operationButtons = document.querySelectorAll('[data-operation]');

function parseNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatResult(value) {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return String(Number(value.toPrecision(10)));
}

function showResult(text, isError = false) {
  resultEl.textContent = text;
  resultEl.classList.toggle('result__value--error', isError);
  resultEl.classList.remove('result__value--pulse');
  // Restart animation so each calculation feels responsive
  void resultEl.offsetWidth;
  resultEl.classList.add('result__value--pulse');
}

function calculate(operationName) {
  const a = parseNumber(firstInput.value);
  const b = parseNumber(secondInput.value);

  if (a === null || b === null) {
    showResult('Enter two valid numbers', true);
    return;
  }

  const operation = operations[operationName];
  if (!operation) {
    showResult('Unknown operation', true);
    return;
  }

  try {
    const value = operation(a, b);
    showResult(formatResult(value));
  } catch (error) {
    showResult(error.message || 'Something went wrong', true);
  }
}

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculate(button.dataset.operation);
  });
});
