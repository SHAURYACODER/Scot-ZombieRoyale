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
  Engine.run(engine);

  polygon = Bodies.circle(50,200,20);
  World.add(world,polygon);

  slingShot = new Slingshot(this.polygon,{x:100,y:200});

  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  background("green");

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();

   image(polygon_img ,polygon.position.x,polygon.position.y,40,40);

    game.play();
  }
  if(gameState === 2){
    game.end();
  }

} 

function mouseDragged(){
  Matter.Body.setPosition(this.polygon,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}

function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.polygon);
  }
}