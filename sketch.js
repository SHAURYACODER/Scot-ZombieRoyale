const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;

var backgroundImage;
var car2_img,car1_img,polygon_img;
var Ymark;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var polygon;
var slingShot;
var cars, car1, car2;

function preload(){

  backgroundImage = loadImage("Untitled.png");
  car2_img = loadImage("New Project.png");
  car1_img = loadImage("shoot_stand_005.png");
  Ymark = loadImage("you.png");
  polygon_img = loadImage("arrow.png");

}

function setup(){

  var canvas = createCanvas(800,800);

  engine = Engine.create();
  world = engine.world;

  polygon = new Bird(200,50);

  slingshot = new SlingShot(polygon.body,{x:200, y:50});

  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  background("green");

  Engine.update(engine);

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();

    polygon.display();
    slingshot.display();

    game.play();
  }
  if(gameState === 2){
    game.end();
  }

} 

/*function mouseDragged(){
  //if (gameState!=="launched"){
      Matter.Body.setPosition(polygon.body, {x: mouseX , y: mouseY});
  //}
}


function mouseReleased(){
  slingshot.fly();
  gameState = "launched";
}*/

function keyPressed(){
  if(keyCode === 32){
      polygon.trajectory=[];
      Matter.Body.setPosition(polygon.body,{x:200,y:50});
     slingshot.attach(polygon.body);
  }
}