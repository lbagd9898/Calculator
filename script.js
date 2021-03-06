var displayValue = "";
var inputValue = "";
var isLastInputAnOperation = true;

// saves bool that determine current value of +/- button
var plusMinusIsPlus = true;


// holds all numbers and operations
var inputArray = [];

const input_row = document.querySelector('#top-row');

const display_row = document.querySelector('#bottom-row')

const operations = "+-*/";


document.querySelector("#equals").addEventListener("click", event => {
    displayValue = calculate()
    display_row.innerHTML = displayValue;
    });


// populates input tab with numbers when numbers pressed
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener("click", event => { 
        inputValue += item.innerHTML;
        input_row.innerHTML = inputValue;
        isLastInputAnOperation = false;
    });
});

// clears input tab when A/C button is pressed
document.querySelector("#clear").addEventListener("click", clearInput)

function clearInput(){
    inputValue = "";
    input_row.innerHTML = inputValue;
    isLastInputAnOperation = true;
}

document.querySelector('#clear').addEventListener('dblclick', event => {
    inputValue = "";
    input_row.innerHTML = inputValue;
    isLastInputAnOperation = true;
    displayValue = "";
    display_row.innerHTML = displayValue;

})

// add functionality to plus minus button
document.querySelector('#plus-minus').addEventListener("click", event => {
    inputValue = plusMinus();
    input_row.innerHTML = inputValue;
})

// adds functionality to +/- btn
function plusMinus(){
    console.log(inputValue)
    let operationIndices = [];
    for (i=0; i<operations.length; i++){
        for (x=0; x<inputValue.length; x++){
            if (inputValue[x] === operations[i]){
                operationIndices.push(x)
                console.log(operationIndices)
            };
        };
    };
    if (operationIndices.length == 0){
        console.log(0)
        console.log(inputValue)
        console.log("no")
        inputValue = "-" + inputValue;
        console.log(inputValue)
        return inputValue
    }
    console.log(operationIndices)
    let max = Math.max(...operationIndices)
    console.log(max)
    let operationToChange = inputValue[max]
    if (operationToChange === "+"){
        console.log("plus")
        inputValue = inputValue.substring(0, max) + '-' + inputValue.substring(max+1)

    } else if (operationToChange === "-"){
        inputValue = inputValue.substring(0, max) + '+' + inputValue.substring(max+1)
    } else {
        inputValue = inputValue.slice(0, max+1) + '-' + inputValue.slice(max+1);
    }
    return inputValue
}

//populates input tab with +/- and adds it to inputValue when +/- buttons pressed
document.querySelectorAll('.add-sub').forEach(item => {
    item.addEventListener("click", event => {
        if (isLastInputAnOperation){
            return;
        } else {
            inputValue += item.innerHTML;
            input_row.innerHTML = inputValue;
            isLastInputAnOperation = true;
        };
    });
});

// when divide button pressed populates input tab with divide sign and adds it to input value
document.querySelector('#divide').addEventListener("click", event => {
    if (isLastInputAnOperation){
        return;
    } else {
        inputValue += "/";
        input_row.innerHTML = inputValue;
        isLastInputAnOperation = true;
    };
}); 

// when multiply button pressed populates input tab with divide sign and adds it to input value
document.querySelector("#multiply").addEventListener("click", event => {
    if (isLastInputAnOperation){
        return;
    } else {
        inputValue += "*";
        input_row.innerHTML = inputValue;
        isLastInputAnOperation = true;
    };
}); 


//add functionality to backspace button
document.querySelector('#backspace').addEventListener("click", backspace)

function backspace(){
    inputValue = inputValue.substring(0, inputValue.length - 1)
    console.log(inputValue.substring(0, inputValue.length - 1))
    input_row.innerHTML = inputValue;
    let lastChar = inputValue.charAt(inputValue.length-1);
    console.log(lastChar);
    for (i=0; i<operations.length; i++){
        if (lastChar === operations[i]){
            isLastInputAnOperation = true;
            
        } else {
            isLastInputAnOperation = false;
        }
    }
    console.log(isLastInputAnOperation);
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}
function operate(operation, a, b){
    return operation(a, b);
}

// takes variable inputValue and returns an array separating spliting the variable by operation
function splitInput(){
    let a = '';
    let firstIndex = -1;
    var termArray = []; 
    let lastIndexWasAnOperator = false; 
    for (i=1; i<inputValue.length; i++){
        if (lastIndexWasAnOperator){
            lastIndexWasAnOperator = false;
            continue
        }
        if (operations.includes(inputValue[i])){
            let termA = inputValue.slice(firstIndex+1, i)
            termArray.push(termA);
            termArray.push(inputValue[i]);
            firstIndex = i;
            console.log(termArray)
            lastIndexWasAnOperator = true;
        } else {
            lastIndexWasAnOperator = false;
        }
    }
    termA = inputValue.slice(firstIndex+1)
    termArray.push(termA)
    return termArray
}

function determineTheOperator(operator){
    if (operator === "+"){
        return add
    } else if (operator === "-"){
        return subtract
    } else if (operator === "/"){
        return divide
    } else if (operator === '*'){
        return multiply
    }
}

// takes term array of user input and calculates it term by term
function calculate(){
    let termArray = splitInput();
    console.log(termArray)
    if (termArray.length < 3){
        return "finish the problem lady!"
    }
    let a = parseFloat(termArray[0])
    console.log(a);
    let b = parseFloat(termArray[2]);
    console.log(b);
    let op = termArray[1];
    let operator = determineTheOperator(op);
    a = operate(operator, a, b)
    console.log(a);
    let index = 3
    while (index < termArray.length){
        op = termArray[index];
        console.log(op);
        operator = determineTheOperator(op)
        b = parseFloat(termArray[index+1]);
        a = operate(operator, a, b);
        console.log(a);
        index += 2;
    }
    console.log(a)
    if (a === Infinity){
        return "u can't divide by 0 girlfriend"
    } else if (isNaN(a)){
        return "finish the problem lady!"
    }
    let aRounded = Math.round(a * 1000000) / 1000000
    return  "= " + aRounded
}

function addNumberToInput(e){
    inputValue += e;
    input_row.innerHTML = inputValue;
    isLastInputAnOperation = false;
}

function addOperation(e){
    if (isLastInputAnOperation){
        return;
    } else {
        inputValue += e;
        input_row.innerHTML = inputValue;
        isLastInputAnOperation = true;
    };
}

//add keyboard shortcuts
const numberKeys = '1234567890.'
document.addEventListener('keydown', function(key) {
    for (i=0; i<numberKeys.length; i++){
        if (key.key === numberKeys[i]){
            addNumberToInput(key.key);
            break;
        }
    }
    if (key.key === "+" || key.key === "-" || key.key === "*" || key.key === "/"){
        addOperation(key.key);
    } else if (key.key === "=" || key.key === "Enter") {
        displayValue = calculate()
        display_row.innerHTML = displayValue;
    } else if (key.key === "Backspace"){
        backspace();
    } else if (key.key === "c"){
        console.log('c')
        clearInput();
    } else if (key.key === "ArrowDown"){
        inputValue = plusMinus();
        input_row.innerHTML = inputValue;
    } else if (key.key === 'x'){
        clearInput();
        displayValue = "";
        display_row.innerHTML = displayValue;
    }
})


