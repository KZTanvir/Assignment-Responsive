////////////////////////////
// Calculator             //
// GitHub: @KZTanvir      //
////////////////////////////

var arr = []; // holds the calculation as a string of numbers and operators

function put_result(result) {
    document.getElementById('result').textContent = result;
}

function put_expression(expression) {
    document.getElementById('expression').textContent = expression;
}

function add_number(number) {
    arr.push(number);
    //document.getElementById('result').textContent = arr.join('');
    put_expression(arr.join(''));
}

function add_operator(operator) {
    //prevent invalid input
    if (arr.length === 0 || ['+', '-', '*', '/', '%', '^'].includes(arr[arr.length - 1])) {
        put_result("Invalid input");
        put_expression("Enter a number first");
        return; // Ignore invalid input
    }
    arr.push(operator);
    put_expression(arr.join(''));
}

function back_button() {
    if (arr.length > 0) {
        arr.pop();
        put_expression(arr.join(''));
        put_result(0);
    }
    if (arr.length === 0) {
        put_expression("None Left");
    }
}

function clear_all() {
    arr = [];
    put_expression("No input");
    put_result(0);
}

function calculate() {
    if (arr.length === 0) {
        console.log("No input");
        put_expression("No Expression");
        put_result(0);
        return;
    }

    let number_string = '';
    let expression = []; // Expression to hold numbers and operators

    // seperate into numbers and operators
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if (['+', '-', '*', '/', '%', '^'].includes(element)) {
            if (number_string === '') {
                put_result("Invalid input");
                return;
            }
            expression.push(Number(number_string));
            expression.push(element);
            number_string = '';
        } else {
            number_string += element;
        }
    }

    if (number_string !== '') {
        expression.push(Number(number_string));
    } else {
        put_result("Operator At The End");
        return;
    }

    // for power first
    for (let i = 0; i < expression.length; i++) {
        let element = expression[i];
        if (element === '^') {
            let result = expression[i - 1] ** expression[i + 1];
            expression.splice(i - 1, 3, result);
            i--;
        }
    }
    // for modulo second
    for (let i = 0; i < expression.length; i++) {
        let element = expression[i];
        if (element === '%') {
            let result = expression[i - 1] % expression[i + 1];
            expression.splice(i - 1, 3, result);
            i--;
        }
    }
    // for division and multiplication based on BODMASH system
    // timelimit brackets not implemented
    for (let i = 0; i < expression.length; i++) {
        let element = expression[i];
        if (element === '*') {
            let result = expression[i - 1] * expression[i + 1];
            expression.splice(i - 1, 3, result);
            i--;
        } else if (element === '/') {
            if (expression[i + 1] === 0) {
                //put_result("Error");
                put_result("Division By Zero");
                return;
            }
            let result = expression[i - 1] / expression[i + 1];
            expression.splice(i - 1, 3, result);
            i--;
        }
    }

    // for addition and subtraction
    let result = expression[0];
    for (let i = 1; i < expression.length; i += 2) {
        let operator = expression[i];
        let operand = expression[i + 1];
        if (operator === '+') {
            result += operand;
        } else if (operator === '-') {
            result -= operand;
        }
    }

    //display and return the result
    put_result(result);
    return result; // for testing purpose
}
