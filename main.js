let buttons = document.querySelectorAll('button');
let screen = document.querySelector('.screen p');

let operator;
let operandA;
let operandB;
let operatorSum = false;

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let clickedButton = e.target.textContent.trim();

    switch (clickedButton) {
      case 'CLEAR':
        operandA = '';
        operandB = '';
        operator = '';
        screen.textContent = '0';
        operatorSum = false;
        break;

      case 'DELETE':
        if (screen.textContent.length === 1) { 
          screen.textContent = 0;
        } 
        else if (operator) {
          screen.textContent = screen.textContent.slice(0, -1);
          operandB = screen.textContent;
        }
        else {
          screen.textContent = screen.textContent.slice(0, -1);
          operandA = screen.textContent;
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
        if (!operandB) {
          operator = clickedButton;
        }

        if (operandA && operandB) {
          let result = calculateResult(operandA, operandB, operator);
          if (result !== '') {
            screen.textContent = result;
            operandA = result;
            operandB = '';
            operator = clickedButton;
            operatorSum = true;
          }
          
        } else {
          screen.textContent = '0';
        }
        break;

      case '=':
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

      default:
        if (screen.textContent === '0' || operatorSum) {
          screen.textContent = e.target.textContent;
          operatorSum = false;
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
    if (operandB === '0') {
      alert("You can't divide by 0!!");
      return;
    }
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