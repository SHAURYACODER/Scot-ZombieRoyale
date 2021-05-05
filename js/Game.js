class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(200,200,50,50);
    car1.addImage("car1",car1_img);
    car1.scale = 0.15;

    car2 = createSprite(300,100,50,50);
    car2.addImage("car2",car2_img);
    car2.scale = 0.2;

    cars = [car1, car2];
  }

  play(){
    form.hide();

    background(backgroundImage);

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = -450 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 590;
        //use data form the database to display the cars in y direction
        //y = displayHeight - allPlayers[plr].distance;
        y = 300
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          var You = createSprite(cars[index - 1].x,cars[index - 1].y+100,50,500);
          You.addImage(Ymark);
          You.scale = 0.15
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
 
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>3860){
      gameState = 2;
    }
    drawSprites();
  }
  end(){
    console.log("GAME ENDED");
  }
}