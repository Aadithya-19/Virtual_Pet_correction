var dog, doghappy, dogImg2;
var foodS = 0;

function preload()
{
  dogImg2 = loadImage("images/dogImg.png");
  doghappy = loadImage("images/dogImg1.png");
}

function setup() {

  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.addImage("dog_original", dogImg2);
  //*** add the image to be changed in function setup */
  dog.addImage("happy",doghappy);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  

  background(46, 200, 87);
  textSize(20);
  text("Press the Up arrow to feed the dog", 100, 100);
  text("Food left : " + foodS, 100, 150);
  color(0, 0, 0);
   
  drawSprites();

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

 function writeStock(x){

  if (x<=0){
    x=0;
  }
  else{
    x = x - 1;
    database.ref('/').update({
    Food : x
    })
  }
 }


function keyPressed() {
  if (keyCode === UP_ARROW) {
    console.log(foodS);
   writeStock(foodS);
   //*** use changeImage for changing an already existing image */
   //**** also use the same label "happy" in setup and here */
   dog.changeImage("happy", doghappy);
   }
 }

