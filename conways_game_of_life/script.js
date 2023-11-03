let resolution = 0.2;
let squareSize = 32 * resolution;


let allTiles = [];
let allTilesNEXT = [];
function setup() {
  createCanvas(windowWidth, windowHeight);  
  background(255);
  stroke(0, 0, 0);
  // strokeWeight(3 * resolution);
  noStroke();
  for (let posX = 0; posX < windowWidth; posX+=squareSize) {
    var tileColumn = [];
    for (let posY = 0; posY < windowHeight; posY+=squareSize) {
      let newTileState = 'dead';
      if(Math.floor(random(0,20))===0){
        newTileState = 'alive';
      }
      tileColumn.push(makeTile(posX, posY, newTileState));
    }
    allTiles.push(tileColumn);

    for (let i=0; i<allTiles.length; i++) {
      allTilesNEXT[i] = allTiles[i].slice(0);
    }
    
  }
  storeTilePositionInArray();

  // allTiles.forEach(tileColumn => tileColumn.forEach(tile => checkTile(tile)));
}
//just for testing - set resolution to 3 for this check to work
function checkTile(tile) {
  if (tile.column == 0 || tile.column == 10){
    if (tile.row == 0 || tile.row == 7) {
      console.log("Expected 3, actual: " + getAdjacents(tile).length);
    } else
      console.log("Expected 5, actual: " + getAdjacents(tile).length);
  }
  else if (tile.row == 0 || tile.row == 7) {
    if (tile.column == 0 || tile.column == 10) {
      console.log("Expected 3, actual: " + getAdjacents(tile).length);
    } else
      console.log("Expected 5, actual: " + getAdjacents(tile).length);
  }
  else {
    console.log("Expected 8, actual: " + getAdjacents(tile).length);
  }
}


function draw() {
  frameRate(20);
  updateTilesForNextCicle()
  allTilesNEXT.forEach(tileColumn => tileColumn.forEach(tile => drawSquare(tile)));
  allTiles.forEach(tileColumn => tileColumn.forEach(tile => updateSquare(tile)));
}

function updateTilesForNextCicle() {
  for (let i=0; i<allTilesNEXT.length; i++) {
      allTiles[i] = allTilesNEXT[i].slice(0);
    }
}

function drawSquare(tile) {
  if (allTilesNEXT[tile.column][tile.row].state == 'alive') {
    fill('#ffffff');
  } else {
    fill('#222222');
  }
  square(tile.posX, tile.posY, squareSize);
}

function updateSquare(tile) {
  if (tile.column == 20) {
    console.log(tile);
  }
  let shouldBeAlive;
  let amountAlive = getAmountAliveAdjacent(tile);
  if (tile.state === 'dead') {
    shouldBeAlive = amountAlive === 3;
  } else {
    shouldBeAlive = hasTwoOrThreeAdjacent(amountAlive) ? true : false;
  }
    if (shouldBeAlive) {
      allTilesNEXT[tile.column][tile.row].state = 'alive';
    } else {
      allTilesNEXT[tile.column][tile.row].state = 'dead';
    }
}

function hasTwoOrThreeAdjacent(amountAlive) {
  return (amountAlive == 2 || amountAlive == 3);
}

function getAmountAliveAdjacent(tile) {
  let amountAlive = 0;
  let adjacentTiles = getAdjacents(tile);
  adjacentTiles.filter(tile => tile.state == 'alive').forEach(tile => amountAlive++);
  return amountAlive;
}

function getAdjacents(tile) {
  let adjacentTiles = [];
  // i = column with respect to tile; j = row with respect to tile
  for (let i = -1; i <= 1; i++) {
    if(!columnOutOfBounds(tile,i)) {
      for (let j = -1; j <= 1; j++) {
        if(!rowOutOfBounds(tile, j, i) && !tileItself(i,j)) {
        adjacentTiles.push(allTiles[tile.column - i][tile.row - j]);
        }
      }
    }
  }
  return adjacentTiles;
}

function tileItself(i,j) {
  return i == 0 && j == 0;
}

function columnOutOfBounds(tile, i) {
  return (tile.column - i < 0 || tile.column - i >= allTiles.length);
}

function rowOutOfBounds(tile, j, i) {
  return (tile.row - j < 0 || tile.row - j >= allTiles[0].length);
}

// iterates through the array and adds its position index to each tile
function storeTilePositionInArray() {
  for (let column = 0; column < allTiles.length; column++) {
    for (let row = 0; row < allTiles[column].length; row++) {
      allTiles[column][row].column = column;
      allTiles[column][row].row = row;
    }
  }
}

// returns a tile object
function makeTile(posX, posY, state, colPos, rowPos){
  return {posX: posX, posY: posY, state: state, column: undefined, row: undefined};
}
