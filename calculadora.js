'use strict'

//BUG: DOUBLE CLICK SIGNS IN MULTIPLE SCENARIOS

const calcKeys = document.querySelectorAll('[id*=key]');
let displayScreen = document.getElementById('display');
const calcSigns = document.querySelectorAll('[id*=Sign]');
let preview = document.querySelector('.preview');

displayScreen.textContent = 0;

let memory = [];

let displayClear = true;

const displayInput = (e) => {

    const key = e.target.textContent;
    if (displayClear) {
        displayClear = false;
        displayScreen.textContent = key;
    } else if (displayScreen.textContent == 0) {
        displayClear = false;
        displayScreen.textContent = key;
    } else {
        displayScreen.textContent += key;
    }
}
calcKeys.forEach(numbers => numbers.addEventListener('click', (e) => displayInput(e)));

const displayResult = (result) => {

    if (result.length > 10) {
        result = result.slice(0, 10);
        console.log('slicedResult')
    }
    displayScreen.textContent = result;
}

const calculate = () => {

    if (memory.length > 2) {

        let result = eval(`${memory[0]}${memory[1]}${memory[2]}`)  /* ***** */
        console.log(memory);
        console.log('Calculating...')
        memory.splice(0, 3);
        memory.unshift(result);
        result = result.toString().replace('.', ',')

        console.log(result);
        console.log(memory);
        displayResult(result);
    }
}

const memoryInput = (e) => {

    let sign = e.target.textContent

    const memorySetup = () => {

        memory.push(parseFloat(displayScreen.textContent.replace(',', '.')));
        console.log(`${displayScreen.textContent} added to memory :${memory}.`);
        memory.push(sign);
        console.log(`${sign} Sign was added to memory.`);
        displayClear = true;
        displayScreen.textContent = "";
        previewInput();
        //calculate()

    }

    if (displayScreen.textContent.length > 0) {

        memorySetup();

        if (sign === '=') {

            if (memory.length <= 2) {

                console.log('no numbers to calculate')
                displayScreen.textContent = memory[0]; //if you press equal before memory completely set for calculation displays current number on screen
            } else {

                calculate();
            }

            console.log("memoryBlankEqualSign")
            memory = [];

        } else {
            calculate();
            previewInput();
        }
        // BUG : double click sign in multiple scenarios

    } else if (displayScreen.textContent === "" && sign === '-') {

        console.log('aqui')
        displayScreen.textContent += sign;
        displayClear = false;
    } 
}
calcSigns.forEach(sign => sign.addEventListener('click', memoryInput));

const previewInput = () => {

    preview.textContent = memory.toString().replace(/,/g, " ");
    /***regular expression /g ****/

}

const deleteAll = () => {
    displayScreen.textContent = 0;
    displayClear = true;
    previewInput();
    //BUG : Using CE after displayResult() should not only clear screen but memory as well.
}
document.getElementById('deleteAll').addEventListener('click', deleteAll);

const clearCalc = () => {

    display.textContent = 0;
    memory = [];
    displayClear = true;
    console.log(memory);
    previewInput();
};
document.getElementById('clearCalc').addEventListener('click', clearCalc);

const deleteCalc = () => {
    if (displayScreen.textContent.length > 1) {
        displayScreen.textContent = displayScreen.textContent.slice(0, -1)
        //memory = [];
        console.log(displayScreen.textContent)
    } else {
        displayScreen.textContent = 0;
        memory = [];
        displayClear = true;

    }
}
document.getElementById('delete').addEventListener('click', deleteCalc);

const plusMinus = () => displayScreen.textContent = displayScreen.textContent * -1;
document.getElementById('plusMinus').addEventListener('click', plusMinus)

const comma = () => {

    if (displayScreen.textContent === "") {

        displayScreen.textContent = displayScreen.textContent += "0,";
        displayClear = false;

    } else if (!displayScreen.textContent.includes(',')) {

        displayScreen.textContent += ',';
        displayClear = false;
    }
}
document.getElementById('comma').addEventListener('click', comma);

const keyboardMap = {

    '0': 'key0',
    '1': 'key1',
    '2': 'key2',
    '3': 'key3',
    '4': 'key4',
    '5': 'key5',
    '6': 'key6',
    '7': 'key7',
    '8': 'key8',
    '9': 'key9',
    '/': 'divisionSign',
    '*': 'multiplySign',
    '-': 'subtractionSign',
    '+': 'additionSign',
    '.': 'comma',
    ',': 'comma',
    'Enter': 'equalSign',
    'Backspace': 'delete',
    'c': 'clearCalc',
    'Escape': 'deleteAll',
}

const click = (e) => {

    /* **** */
    if (Object.keys(keyboardMap).indexOf(e.key) !== -1) {

        console.log(keyboardMap[e.key])
        document.getElementById(keyboardMap[e.key]).click();
    }

}
document.addEventListener('keydown', click);




