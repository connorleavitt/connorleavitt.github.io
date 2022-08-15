const DEFAULT_PEN_COLOR = 'black';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentPenColor = DEFAULT_PEN_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let gridLines = true;
let clickActive = false;

function setCurrentPenColor(newPenColor) {
    currentPenColor = newPenColor;
  }
  
function setCurrentMode(newMode) {
    buttonSettings(newMode);  
    currentMode = newMode;
  }

function setCurrentSize(newSize) {
    currentSize = newSize;
  }



const container = document.querySelector('#container');
const colorButton = document.getElementById('colorButton')
const rainbowButton = document.getElementById('rainbowButton')
const eraserButton = document.getElementById('eraserButton')
const gridLineButton = document.getElementById('gridLineButton')
const userGridSize = document.querySelector('#grid-size');
const clearGridBtn = document.querySelector('#clear-grid');
const penColorChoice = document.getElementById("penColor");
const clearButton = document.getElementById("clear-grid");


container.onmousedown = () => (clickActive = true);
container.onmouseup = () => (clickActive = false);
container.onmouseleave = () => (clickActive = false);
userGridSize.onmousemove = (e) => gridSizeValue(e.target.value)
userGridSize.onchange = (e) => updateSize(e.target.value)
penColorChoice.oninput = (e) => setCurrentPenColor(e.target.value)
clearButton.onclick = () => resetGrid()
colorButton.onclick = () => setCurrentMode('color')
rainbowButton.onclick = () => setCurrentMode('rainbow')
eraserButton.onclick = () => setCurrentMode('eraser')
gridLineButton.onclick = () => gridLineToggle()

function gridSizeValue(value) {
    document.getElementById("gridSizeValue").innerHTML = `Grid Size: ${value} x ${value}`;
}

function updateSize(value) {
    setCurrentSize(value)
    gridSizeValue(value)
    resetGrid(value)
    gridLines = true;
}

function resetGrid() {
    clearGrid();
    generateGrid(currentSize);
}

function clearGrid() {
    container.innerHTML = ''
    // container.replaceChildren();
  }


function generateGrid(size) {
    clearGrid()
    container.style.setProperty('--grid-rows', size);
    container.style.setProperty('--grid-cols', size);
    for (let i = 0; i < (size * size); i++) {
        let newGridDiv = document.createElement('div');
        newGridDiv.classList.add("grid-item");
        newGridDiv.classList.add("grid-lines");
        newGridDiv.addEventListener('mousedown', activatePen)
        newGridDiv.addEventListener('mouseover', activatePen)
        container.append(newGridDiv);
    }
}

function activatePen(e) {
    if (!clickActive && e.type === 'mouseover') return
    else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentPenColor
    } else if (currentMode === 'rainbow') {
        let randomR = Math.floor(Math.random() * 256)
        let randomG = Math.floor(Math.random() * 256)
        let randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white'
    }
}

function gridLineToggle () {
    if (gridLines) {
        let div = document.querySelectorAll(".grid-item")
        for (let i = 0; i < div.length; i++) {
            div[i].classList.remove("grid-lines");
        }
        gridLines = false;
    } else {
        let div = document.querySelectorAll(".grid-item")
        for (let i = 0; i < div.length; i++) {
            div[i].classList.add("grid-lines");
        }
        gridLines = true;   
    }
  }



function buttonSettings(newMode) {
    if (currentMode === 'color') {
        colorButton.classList.remove('button-on')
    } else if (currentMode === 'rainbow') {
        rainbowButton.classList.remove('button-on')
    } else if (currentMode === 'eraser') {
        eraserButton.classList.remove('button-on')
    }

    if (newMode === 'color') {
        colorButton.classList.add('button-on')
    } else if (newMode === 'rainbow') {
        rainbowButton.classList.add('button-on')
    } else if (newMode === 'eraser') {
        eraserButton.classList.add('button-on')
    }
}

window.onload = () => {
    generateGrid(DEFAULT_SIZE)
    buttonSettings(DEFAULT_MODE);
  }