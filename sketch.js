let r = 0.75;
let toggle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  frameRate(30)

  slider = createSlider(1, 60, 30);
  slider.position(20, 50);

  let sliderName = createP('Frame Rate');
  sliderName.position(60, 10);
  sliderName.style('color', '#ffc200');

  toggle = createCheckbox('Toggle', false);
  toggle.position(20, 90);
  let toggleName = createP('Purify Values');
  toggleName.position(60, 75);
  toggleName.style('color', '#ffc200');

  button = createButton('Restart');
  button.position(20, 125);
  button.mousePressed(restart);
}

function draw() {
  let x = 0.1;
  stroke(255, 194, 0);
  strokeWeight(2);

  frameRate(slider.value()); // Set the frame rate to the value of the slider

  if(toggle.checked()){
    // Skip the first 1000 values
    for (let i = 0; i < 1000; i++) {
      x = logistic(r, x);
    }
  }


  for (let i = 0; i < 1000; i++) {
    x = logistic(r, x);
    let px = map(r, 0, 5, 0, width);
    let py = map(x, 0, 1, height, 0);
    point(px, py);
  }
  r += 0.005;
}

function logistic(r, x) {
  return r * x * (1 - x);
}

function restart() {
  r = 0.75;
  background(0);
}