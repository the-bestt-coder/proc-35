var balloon
var cityImg, balloonAnimation;
var database;

function preload() {
  cityImg = loadImage('Images/cityImage.png');
  balloonAnimation = loadAnimation('Images/HotAirBallon01.png', 'Images/HotAirBallon02.png', 'Images/HotAirBallon03.png');

}

function setup() {
  database = firebase.database();
  createCanvas(900, 900);

  balloon = createSprite(150, 150, 40, 70);
  balloon.addAnimation("hotairballoon", balloonAnimation);
  balloonPosition = database.ref('BALLOON/position');
  balloonPosition.on("value", readPosition, showError);



}

function showError(){
  console.log("database error");
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function draw() {
  background(cityImg);

  if (keyDown(LEFT_ARROW)) {
    writePosition(-10, 0);
  }

  else if (keyDown(RIGHT_ARROW)) {
    writePosition(10, 0);
  }
  else if (keyDown(UP_ARROW)) {
    writePosition(0, -10);
  }
  else if (keyDown(DOWN_ARROW)) {
    writePosition(0, 10);
  }


  drawSprites();

}


function writePosition(x, y) {
  database.ref("BALLOON/position").set(
    {
      'x': position.x + x,
      'y': position.y + y
    }
  )
}
