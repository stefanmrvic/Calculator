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

let operator;
let operandA;
let operandB;
let dotIsPresent = false;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let clickedButton = e.target.textContent.trim();

        switch(clickedButton) {
            case 'CLEAR':
                operandA = '';
                operandB = '';
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
                // if (!operandA.includes('.') || !) {
                //     screen.textContent += e.target.textContent;
                // }
                break;
            case '+':
                operandA = screen.textContent;
                operator = '+';
                screen.textContent = '0';
                break;
            case '-':
                operandA = screen.textContent;
                operator = '-';
                screen.textContent = '0';
                break;
            case '×':
                operandA = screen.textContent;
                operator = '*';
                screen.textContent = '0';
                break;
            case '÷':
                operandA = screen.textContent;
                operator = '/';
                screen.textContent = '0';
                break;
            case '=':
                operandB = screen.textContent.trim();
                console.log(operandA);
                console.log(operandB);
            default:
                if (screen.textContent === '0') {
                    screen.textContent = e.target.textContent;
                } else {
                    screen.textContent += e.target.textContent;
                }
                break;
        }
    })
})