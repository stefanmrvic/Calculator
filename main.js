let buttons = document.querySelectorAll('button');
let screen = document.querySelector('.screen p');

let operator;
let operandA;
let operandB;
let dotIsPresent = false;

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let clickedButton = e.target.textContent.trim();

    switch (clickedButton) {
      case 'CLEAR':
        operandA = '';
        operandB = '';
        operator = '';
        screen.textContent = '0';
        break;
      case 'DELETE':
        if (screen.textContent.length === 1) screen.textContent = 0;
        else screen.textContent = screen.textContent.slice(0, -1);
        break;
      case '0':
        if (screen.textContent === '0') {
          screen.textContent = e.target.textContent;
        } else {
          screen.textContent += e.target.textContent;
        }
        break;
      case '.':
        if (!screen.textContent.includes('.')) {
             screen.textContent += e.target.textContent;
         }
        break;
      case '+':
      case '-':
      case '×':
      case '÷':
        operator = clickedButton;
        screen.textContent = '0';

        if (operandA && operandB) {
          let result = calculateResult(operandA, operandB, operator);

          operandA = result;
          operandB = '';
          screen.textContent = result;
        }
        break;
        
      case '=':
        console.log(operandA);
        console.log(operandB);
        if (operandA && operandB) {
          let result = calculateResult(operandA, operandB, operator);

            operandA = result;
            operandB = '';
            screen.textContent = result;
        }
        break;
        
      default:
        if (screen.textContent === '0') {
          screen.textContent = e.target.textContent;
        } else {
            screen.textContent += e.target.textContent;
        }
        if (!operator) {
          operandA = screen.textContent;
        } else {
            operandB = screen.textContent;
        }
        break;
    }
  })
})

function calculateResult(operandA, operandB, operator) { 
  
  let sum;
  
  if (operator === '+') {
    sum = add(operandA, operandB);
  }
  else if (operator === '-') {
    sum = subtract(operandA, operandB);
  }
  else if (operator === '÷') {
    sum = divide(operandA, operandB)
  }
  else if (operator === '×') {
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