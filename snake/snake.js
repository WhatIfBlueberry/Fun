var points = ([[0, 0], [1, 0], [2, 0], [3, 0]]);
var lastDirection = [1, 0];
var canvas;
var scaleFactor;
var collectible;
var collected = true;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(10)
    noFill();
}

function draw() {
    initSettings();
    checkCollision();
    moveFrame(...lastDirection);
    drawSnakeAndCollectible();
    logForDebugging();
}

function checkCollision() {
    checkCollection();
    checkBoundCollision();
    checkSelfCollsion();
}

function logForDebugging() {
    console.log([points[points.length - 1][0]], [points[points.length - 1][1]]);
    console.log(...collectible);
}

function drawSnakeAndCollectible() {
    segments(points);
    point(collectible[0], collectible[1]);
}

function initSettings() {
    let lineThickness = 15;
    scaleFactor = width / 50;
    translate(width / 2, height / 2);
    scale(scaleFactor, -scaleFactor);
    strokeWeight(1 / (scaleFactor / lineThickness));
    background(240);
    stroke(255, 194, 0);
}

function moveFrame(x, y) {
    points.push([points[points.length - 1][0] + x, points[points.length - 1][1] + y]);
    if (!collected) {
        points.shift();
    }
}

function checkCollection() {
    if (collected) {
        collectible = [int(random(-width / (2 * scaleFactor), width / (2 * scaleFactor))), int(random(-height / (2 * scaleFactor), height / (2 * scaleFactor)))];
        collected = false;
    } else {
        collected = true;
    }
    let tip = points[points.length - 1];
    collected = tip[0] === collectible[0] && tip[1] === collectible[1];
}

function checkBoundCollision() {
    let postiveBound = width / (2 * scaleFactor);
    let negativeBound = width / (2 * scaleFactor) * - 1;
    let rightOutOfBounds = points[points.length - 1][0] >= postiveBound;
    let leftOutOfBounds = points[points.length - 1][0] <= negativeBound;
    let topOutOfBounds = points[points.length - 1][1] >= postiveBound;
    let bottomOutOfBounds = points[points.length - 1][1] <= negativeBound;
    if (rightOutOfBounds || leftOutOfBounds || topOutOfBounds || bottomOutOfBounds) {
        console.log('out of bounds!');
        noLoop();
        canvas.mousePressed(() => {
            points = ([[0, 0], [1, 0], [2, 0], [3, 0]]);
            loop();
        });
    }
}

function checkSelfCollsion() {
    let tip = points[points.length - 1];
    for (let i = 0; i < points.length - 1; i++) {
        if (tip[0] === points[i][0] && tip[1] === points[i][1]) {
            console.log('self collision!');
            stopGame();
        }
    }
}


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        lastDirection = [-1, 0];
        return;
    }
    if (keyCode === RIGHT_ARROW) {
        lastDirection = [1, 0];
        return;
    }
    if (keyCode === UP_ARROW) {
        lastDirection = [0, 1];
        return;
    }
    if (keyCode === DOWN_ARROW) {
        lastDirection = [0, -1];
        return;
    }
}

function segments(points) {
    beginShape();
    for (let point of points)
        vertex(...point);
    endShape();
}

function stopGame() {
    noLoop();
    canvas.mousePressed(() => {
        points = ([[0, 0], [1, 0], [2, 0], [3, 0]]);
        loop();
    });
}