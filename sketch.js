//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  textSize(15);
  fill("white");
  // stroke("black");
  strokeWeight(4);
  text("NOTE:PRESS UP ARROW KEY TO FEED THE DOG", 100,40);
  text("IF FOOD REMAINING = 0, FOOD REMAINING WILL = 20", 100,60);

  if(keyWentDown(UP_ARROW)){
    dog.addImage(happyDogImg);
    writeStock(foodS);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  drawSprites();

  //add styles here
  textSize(20);
  fill("white");
  stroke("black");
  strokeWeight(4);
  text("Food Remaining:" + foodS, 250,480);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x>20){
    x=20;
  }else{
    x=x-1;
  }
  if(x<=0){
    x=20; 
  }
  
  database.ref('/').update({
    Food:x
  })
}

