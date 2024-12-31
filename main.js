const buttons = document.querySelectorAll('button');
const screen = document.getElementById('type-screen');
const operateScreen = document.getElementById('operate-screen');
const screenOperandA = document.getElementById('operandA');
const screenOperandB = document.getElementById('operandB');
const screenOperator = document.getElementById('operator');

operateScreen.textContent = '0';

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
      if (!operandB) {
        operator = button;
      }

      if (operandA && operandB) {
        let result = calculateResult(operandA, operandB, operator);
        if (result !== '') {
          screen.textContent = result;
          operandA = result;
          operandB = '';
          operator = button;
          operatorSum = true;
        }
      } else {
        screen.textContent = '0';
        operandA = screen.textContent;
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
      } else {
        operandB = screen.textContent;
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
    return Number(a) / Number(b);
  }
}