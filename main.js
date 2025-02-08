const buttons = document.querySelectorAll('button');
const screen = document.getElementById('type-screen');
const operateScreen = document.getElementById('operate-screen');

// Variables prefixed with "screen" refer to smaller sized operands and operator above the main screen.
let screenOperandA = document.getElementById('operandA');
let screenOperandB = document.getElementById('operandB');
let screenOperator = document.getElementById('operator');

let operator;
let operandA;
let operandB;

// Tracks whether a new number was typed after pressing the operator button.
// If false: it replaces the screen.textContent with the number pressed .
// If true: it "concatenates" the new number to the existing one.
let newNumberTyped = false;

buttons.forEach(button => button.addEventListener('click', operate));
window.addEventListener("keydown", operate);

function operate(e) {
  const button = e.key || e.target.textContent.trim();

  switch (button) {
    case 'CLEAR':
      operandA = '';
      operandB = '';
      operator = '';
      screenOperandA.textContent = '';
      screenOperandB.textContent = '';
      screenOperator.textContent = '';
      screen.textContent = '0';
      newNumberTyped = false;
      break;

    case 'DELETE':
    case 'Backspace':
      if (screen.textContent.length === 1) {
        screen.textContent = 0;
      } else {
        screen.textContent = screen.textContent.slice(0, -1);
      }
      break;

    case '.':
      if (!screen.textContent.includes('.')) {
        screen.textContent += button;
        // Sets newNumberTyped to "true" to avoid "." getting deleted due to not being detected as a part of a number.
        newNumberTyped = true;
      }
      break;

    case '+':
    case '-':
    case '×':
    case '*':
    case '÷':
    case '/':
      if (!operandA) {
        operandA = screen.textContent;
        operator = button;
        screenOperandA.textContent = operandA;
        screenOperator.textContent = operator;
        screen.textContent = '0';
      } else if (!operandB && newNumberTyped) {
        // Sets 
        operandB = screen.textContent;
        screenOperandB.textContent = operandB;
        screenOperandA.textContent = '';
      } else if (!operandB) {
        operator = button;
        screenOperator.textContent = button;
        screenOperandB.textContent = '';
        screenOperandA.textContent = operandA;
      } else {
        screenOperandA.textContent = operandA;
      }

      // If both operands are set when an operator is pressed, calculate the result.
      if (operandA && operandB) {
        let result = calculateResult(operandA, operandB, operator);
        if (result !== '') {
          screen.textContent = result;
          operandA = result;
          operandB = '';
          operator = button;

          screenOperandA.textContent = operandA;
          screenOperator.textContent = button;
          screenOperandB.textContent = '';
        }
      }
      // Sets newNumberTyped to "false", so that when new number is typed, 
      // screen.textContent will be replaced by that number.
      newNumberTyped = false;
      break;
      
      case '=':
      case 'Enter':
        // Checks if operandA is set and if any new number(s) was typed after user pressed 
        // any of the operator buttons.
        if (operandA && newNumberTyped) {
          // It sets operandB as the current screen.textContent, as both operandA and operator are known at that point.
          operandB = screen.textContent;
          screenOperandB.textContent = operandB; 

          let result = calculateResult(operandA, operandB, operator);

          if (result !== '') {
            screen.textContent = result;
            operandA = result;
            operandB = '';
            operator = '';
            screenOperandB.textContent += ' =';
            newNumberTyped = false;
          }
      }
      break;

    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (screen.textContent === '0' || !newNumberTyped) {
        screen.textContent = button;
      } else {
        screen.textContent += button;
      }
      // Sets newNumberTyped to "true" to avoid deleting any new numbers that are being typed.
      newNumberTyped = true;
      break;
  } 
}

function calculateResult(operandA, operandB, operator) {
  let sum;

  if (operator === '+') {
    sum = add(operandA, operandB);
  } else if (operator === '-') {
    sum = subtract(operandA, operandB);
  } else if (operator === '÷' || operator === '/') {
    if (operandB === '0') {
      alert("You can't divide by 0!!");
      return;
    }
    sum = divide(operandA, operandB)
  } else if (operator === '×' || operator === '*') {
    sum = multiply(operandA, operandB);
  }
  // Fixes floating-point precision issues (e.g., 0.1 + 0.2 = 0.30000000000000004).
  return Number(sum.toFixed(1));
}

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}