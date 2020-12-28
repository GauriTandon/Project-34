//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload() {
  //load images here
  dogImg = loadImage('dogImg.png');
  happyDogImg = loadImage('dogImg1.png');
}

function setup() {
  var canvas = createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(18);
  fill("white");
  stroke("white");
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 50, 90);
  text("Food Remaining : " + foodS, 130, 130);
}

//Function to read values from DB
function readStock(data){
  foodS = data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x <= 0){
    x = 0
  } else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
}