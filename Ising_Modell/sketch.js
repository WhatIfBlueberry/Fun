let max = 5;
let scaleFactor = 1;
let matrixSize = 5;
let matrix = [];
let muteButton;


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    scaleFactor = width / max / 2;
    strokeWeight(5);
    noFill();
    fillMatrixRand();
    frameRate(240);
}


function draw() {
    orbitControl();
    scale(scaleFactor, -scaleFactor, scaleFactor);
    background(240);
    //clearScreen();
    if (frameCount % 60 == 0) {
        fillMatrixRand();
    }
    printMatrix();
}

function fillMatrixRand() {
    matrix = [];
    for (let i = 0; i < matrixSize; i++) {
        let row = [];
        for (let j = 0; j < matrixSize; j++) {
            let column = [];
            for (let z = 0; z < matrixSize; z++) {
                column.push(Math.random() < 0.5 ? -1 : 1);
            }
            row.push(column);
        }
        matrix.push(row);
    }
}

function printMatrix() {
    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            for (let z = 0; z < matrixSize; z++) {
                if (matrix[i][j][z] == 1) {
                    push()
                    translate(i, j, z)
                    normalMaterial();
                    box(0.75);
                    pop()
                }
            }
        }
    }
}

function clearScreen() {
    clear();
    background(0);
}

function drawGrid() {
    stroke(255, 0, 0);
    line(-max, 0, 0, max, 0, 0);
    stroke(0, 255, 0);
    line(0, -max, 0, 0, max, 0);
    stroke(0, 0, 255);
    line(0, 0, -max, 0, 0, max);
}
