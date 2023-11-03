let scaleFactor = 1;
let k = 0;
const alpha = x => [cos(x), sin(x), x];
const a = -2*Math.PI;
const b = 2*Math.PI;
const max = 5;


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    scaleFactor = width / max / 2;
    strokeWeight(5);
    noFill();
    frameRate(30);
}

function draw() {
    k %= 1;
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
    drawCurve(alpha, a, a + k*(b-a));
    k += .01;
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
