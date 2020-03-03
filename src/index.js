function eval() {
    // Do not use eval!!! Ok Bro)...reinvent the wheel again.... stupid....curse.. 
    return;
}

function expressionCalculator(expr) {
    return parentheses(toArray(expr));
}

function parentheses(stro) {
    let left_bracket_index = 0;
    let right_bracket_index = 0;
    let parenthesis_counter = 0;
    let parenthese = false;
    let temparr = [];
    for (let i = 0; i < stro.length; i++) {
        if (stro[i] === '(') {
            if (left_bracket_index === 0) {
                if (!parenthese) left_bracket_index = i;
                parenthese = true;
            }
            parenthesis_counter++;
        }
        if (stro[i] === ')') {
            parenthesis_counter--;
            if (parenthesis_counter === 0) {
                parenthese = false;
                right_bracket_index = i;
                i++;
                temparr.push(parentheses(stro.slice(left_bracket_index + 1, right_bracket_index)));
                right_bracket_index = 0;
                left_bracket_index = 0;
            }
        }
        if (!parenthese && stro[i] != undefined)
            temparr.push(stro[i]);
    }
    if (parenthesis_counter != 0) throw new Error("ExpressionError: Brackets must be paired");
    return computation(temparr);
}

function computation(arr) {
    temp = '';
    let arr2 = [];
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != '/' && arr[i] != '*')
            arr2.push(arr[i]);
        else {
            if (arr[i] === '*')
                arr2.push(parseFloat(arr2.pop()) * parseFloat(arr[i + 1]));
            else if (parseFloat(arr[i + 1]) === 0) throw new Error("TypeError: Division by zero.");
            else arr2.push(parseFloat(arr2.pop()) / parseFloat(arr[i + 1]));
            i++;
        }
    }
    result = parseFloat(arr2[0]);
    for (let i = 1; i < arr2.length; i += 2) {
        if (arr2[i] == '+') result += parseFloat(arr2[i + 1]);
        else result += -parseFloat(arr2[i + 1]);
    }
    return result;
}

function toArray(str) {
    let temp = "";
    let arr = [];
    str = str.replace(/\s+/g, '');
    for (let i = 0; i < str.length; i++) {
        if (isFinite(str[i]) || str[i] === '.')
            temp += str[i];
        else {
            if (temp != '')
                arr.push(temp);
            if (str[i] === '*') arr.push('*');
            if (str[i] === '/') arr.push('/');
            if (str[i] === '+') arr.push('+');
            if (str[i] === '-') arr.push('-');
            if (str[i] === ')') arr.push(')');
            if (str[i] === '(') arr.push('(');
            temp = '';

        }
        if (i + 1 == str.length && temp != '')
            arr.push(temp);
    }
    return arr;
}

module.exports = {
    expressionCalculator
}