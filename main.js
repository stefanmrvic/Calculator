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
let result = document.querySelector('.screen p');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (result.textContent === '0') result.textContent = e.target.textContent;
        else result.textContent += e.target.textContent;
    })
})