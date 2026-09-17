/**
 * Browser-side calculator UI logic.
 * Kept separate from src/calculator.js (CommonJS / Node tests).
 */

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

async function calculate(operationName) {
  const a = parseNumber(firstInput.value);
  const b = parseNumber(secondInput.value);

  if (a === null || b === null) {
    showResult('Enter two valid numbers', true);
    return;
  }

  try {
    const response = await fetch(
      `${window.APP_CONFIG.API_BASE_URL}/${operationName}?a=${a}&b=${b}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    showResult(formatResult(data.result));
  } catch (error) {
    showResult(error.message || 'Something went wrong', true);
  }
}

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculate(button.dataset.operation);
  });
});
