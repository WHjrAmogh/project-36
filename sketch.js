var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed,lastFed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedTheDog=createButton("Feed the Dog")
  feedTheDog.position(500,95)
  feedTheDog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  if(lastFed>=12){
    text("lastFed at"+ hour())
  }else if(lastFed==0){
    text("Last Fed at 12 ,350,30")
  }else{
    text("lastFed at"+ hour())
  }
  
 var food_stock_val = foodobj.getFoodStock()
 if(food_stock_val<=0){
   foodObj.updateFoodStock(food_stock_val*0)
 }else{
   foodObj.updateFoodStock(food_stock_val-1)
 }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodStock=foodStock+1
  
  hour()
  database.updatelastFed(lastFed=hour())

  if(lastFed>=12){
    text("lastFed at"+ hour())
  }else if(lastFed==0){
    text("Last Fed at 12 ,350,30")
  }else{
    text("lastFed at"+ hour())
  }
  
  
  
  
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
