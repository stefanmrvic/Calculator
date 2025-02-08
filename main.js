const buttons = document.querySelectorAll('button');
const screen = document.getElementById('type-screen');
const operateScreen = document.getElementById('operate-screen');
let screenOperandA = document.getElementById('operandA');
let screenOperandB = document.getElementById('operandB');
let screenOperator = document.getElementById('operator');

let operator;
let operandA;
let operandB;
let newNumberTyped = false;
let resultCalculated = false;

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

      if (operandA && operandB) {
        let result = calculateResult(operandA, operandB, operator);
        if (result !== '') {
          screen.textContent = result;
          operandA = result;
          operandB = '';
          operator = button;
          resultCalculated = true;

          screenOperandA.textContent = operandA;
          screenOperator.textContent = button;
          screenOperandB.textContent = '';
        }
      }
      newNumberTyped = false;
      break;
      
      case '=':
      case 'Enter':
        if (operandA && newNumberTyped) {
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
            resultCalculated = true;
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

      newNumberTyped = true;
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