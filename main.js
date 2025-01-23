const buttons = document.querySelectorAll('button');
const screen = document.getElementById('type-screen');
const operateScreen = document.getElementById('operate-screen');
let screenOperandA = document.getElementById('operandA');
let screenOperandB = document.getElementById('operandB');
let screenOperator = document.getElementById('operator');

let operator;
let operandA;
let operandB;
let operatorSum = false;

buttons.forEach(button => button.addEventListener('click', operate));
window.addEventListener("keydown", operate);

function operate(e) {
  const button = e.key || e.target.textContent.trim();

  switch (button) {
    case 'CLEAR':
      operandA = '';
      operandB = '';
      operator = '';
      screenOperandA.textContent = '0';
      screenOperandB.textContent = '';
      screenOperator.textContent = '';
      screen.textContent = '0';
      operatorSum = false;
      break;

    case 'DELETE':
    case 'Backspace':
      if (screen.textContent.length === 1) {
        screen.textContent = 0;
      } else if (operator) {
        screen.textContent = screen.textContent.slice(0, -1);
        operandB = screen.textContent;
      } else {
        screen.textContent = screen.textContent.slice(0, -1);
        operandA = screen.textContent;
      }
      break;

    case '.':
      if (!screen.textContent.includes('.')) {
        screen.textContent += button;
      }
      break;

    case '+':
    case '-':
    case '×':
    case '*':
    case '÷':
    case '/':
      
      if (!operandA) {
        screen.textContent = '0';
        operandA = screen.textContent;
        screenOperandA.textContent = operandA;

      } else if (!operandB) {
        operator = button;
        screenOperator.textContent = button;
        screenOperandA.textContent = screen.textContent;
        screen.textContent = '0';

      } else if (operandA && operandB) {
        let result = calculateResult(operandA, operandB, operator);
        if (result !== '') {
          screenOperandA.textContent = operandA;
          screenOperator.textContent = button;
          screenOperandB.textContent += ' =';

          screen.textContent = result;
          operandA = result;
          operandB = '';
          operator = button;
          operatorSum = true;
        }
      } else {
        screenOperandA.textContent = operandA;
      }

      break;

    case '=':
    case 'Enter':
      if (operandA && operandB) {
        let result = calculateResult(operandA, operandB, operator);
        if (result !== '') {
          screen.textContent = result;
          operandA = result;
          operandB = '';
          operator = '';
          screenOperandB.textContent += ' =';
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
      if (screen.textContent === '0' || operatorSum) {
        screen.textContent = button;
        operatorSum = false;
      } else {
        screen.textContent += button;
      }

      if (!operator) {
        operandA = screen.textContent;
        screenOperandA.textContent = operandA;
      } else {
        operandB = screen.textContent;
        screenOperandB.textContent = operandB;
      }
      break;
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
    return sum;
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
}