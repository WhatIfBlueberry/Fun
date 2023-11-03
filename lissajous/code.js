let scaleFactor = 1;
let k = 0;
const max = 5;
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    scaleFactor = width / max / 2;
    strokeWeight(1 / scaleFactor);
    noFill();
}

function draw() {
    k %= 1;
    clear();
    background(0);
    translate(width / 2, height / 2);
    scale(scaleFactor, -scaleFactor);
    stroke(200);
    line(-max, 0, max, 0);
    line(0, -max, 0, max);
    stroke(255, 194, 0);;
    k += .003;
    drawCurve(t => [3*sin(2*t), 2*cos(3*t)], 0, k*2*PI);
    }

function segments (points) {
    beginShape();
    for (let point of points) {
        vertex(...point);
    }
    endShape();
}

function drawCurve (f, a, b, n = 200) {
    segments([...Array(n+1).keys()].map(k => f(a+(b-a)*k/n)));
    }
