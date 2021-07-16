const numberBtns = document.querySelectorAll(".num");
const operationBtns = document.querySelectorAll(".operation");
const equalBtn = document.querySelector(".equal");
const acBtn = document.querySelector(".ac");
const ceBtn = document.querySelector(".ce");
const display = document.querySelector(".display");

let isFirstNum = true;

let firstArray = [];
let firstNum = 0;
let secondArray = [];
let secondNum = 0;

let chosenOperation = "";

let result = 0;

function writeNum() {
    if (isFirstNum && firstArray.length <= 11) {
        receivedNum = this.dataset.num;
        firstArray.push(receivedNum);
        firstNum = parseFloat(firstArray.join(""));
        if (isNaN(firstNum)) firstNum = 0;
        display.innerHTML = firstNum;
    } else if (!isFirstNum && secondArray.length <= 11) {
        receivedNum = this.dataset.num;
        secondArray.push(receivedNum);
        secondNum = parseFloat(secondArray.join(""));
        if (isNaN(secondNum)) secondNum = 0;
        display.innerHTML = secondNum;
    }
}

function Operations() {
    isFirstNum = !isFirstNum;
    chosenOperation = this.dataset.op;
}

function Equal() {
    result = eval(`${firstNum} ${chosenOperation} ${secondNum}`).toPrecision();
    display.innerHTML = result;
    firstNum = result;
    isFirstNum = true;
    firstArray = [];
    secondArray = [];
    secondNum = 0;
    chosenOperation = "";
    result = 0;
}

function allClear() {
    isFirstNum = true;
    firstArray = [];
    firstNum = 0;
    secondArray = [];
    secondNum = 0;
    chosenOperation = "";
    result = 0;
    display.innerHTML = 0;
}

function clearEntry() {
    if (isFirstNum) {
        firstArray.pop();
        firstNum = parseFloat(firstArray.join(""));
        if (isNaN(firstNum)) firstNum = 0;
        display.innerHTML = firstNum;
    } else if (!isFirstNum) {
        secondArray.pop();
        secondNum = parseFloat(secondArray.join(""));
        if (isNaN(secondNum)) secondNum = 0;
        display.innerHTML = secondNum;
    }
}

equalBtn.addEventListener("click", Equal);

acBtn.addEventListener("click", allClear)
acBtn.addEventListener("click", () => display.innerHTML = 0);

ceBtn.addEventListener("click", clearEntry);

numberBtns.forEach(number => { number.addEventListener("click", writeNum) });

operationBtns.forEach(operation => { operation.addEventListener("click", Operations) });

window.addEventListener("keydown", (e) => {
    if (e.key >= 0 && e.key <= 9 || e.key == ".") {
        if (isFirstNum && firstArray.length <= 11) {
            firstArray.push(e.key);
            firstNum = parseFloat(firstArray.join(""));
            if (isNaN(firstNum)) firstNum = 0;
            display.innerHTML = firstNum;
        } else if (!isFirstNum && secondArray.length <= 11) {
            secondArray.push(e.key);
            secondNum = parseFloat(secondArray.join(""));
            if (isNaN(secondNum)) secondNum = 0;
            display.innerHTML = secondNum;
        }
    } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
        isFirstNum = !isFirstNum;
        chosenOperation = e.key;
    } else if (e.key == "Enter") {
        Equal();
    } else if (e.key == "Escape") {
        allClear();
    } else if (e.key == "Backspace") {
        clearEntry();
    }
});