let operator;
let operandA;
let operandB;

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
    return a / b;
}

let buttons = document.querySelectorAll('button');
let screen = document.querySelector('.screen p');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let clickedButton = e.target.textContent.trim();

        if (clickedButton === 'CLEAR') screen.textContent = '0';
        else if (clickedButton === 'DELETE') { 
            if (screen.textContent.length === 1) screen.textContent = 0;
            else screen.textContent = screen.textContent.slice(0, -1);
        }
        else if (screen.textContent === '0') screen.textContent = e.target.textContent;
        else screen.textContent += e.target.textContent;
    })
})