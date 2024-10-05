let scaleFactor = 1;
const max = 10;
let font;

function preload() {
  font = loadFont("KronaOne-Regular.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textFont(font);
    textSize(windowWidth*0.1);
    scaleFactor = width / max / 2;
    strokeWeight(5);
    noFill();
    frameRate(3);
}

function draw() {
    clear();
    background(0);
    orbitControl();
    scale(scaleFactor, -scaleFactor, scaleFactor);
    stroke(255, 0, 0);
    line(-max, 0, 0, max, 0, 0);
    stroke(0, 255, 0);
    line(0, -max, 0, 0, max, 0);
    stroke(0, 0, 255);
    line(0, 0, -max, 0, 0, max);
    stroke(255, 194, 0);
    push();
    translate(0, 0, 0);
    fill(255, 194, 0);
    box(2);
    pop();
    let numOrangePixels = getNumOfVisibleOrangePixels();
    displayNumOfVisibleOrangePixels(numOrangePixels);
    }

function getNumOfVisibleOrangePixels() {
    loadPixels();
    let visibleOrangePixels = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;
            if (pixels[index] === 255 && pixels[index + 1] === 194 && pixels[index + 2] === 0) {
                visibleOrangePixels++;
            }
        }
    }
    return visibleOrangePixels;
}

function displayNumOfVisibleOrangePixels(num) {
    textSize(32);
    fill(255);
    text('Visible orange pixels: ' + num, 10, 30);
}


