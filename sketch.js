var bgImg;
var gameState = "play";
var boy,boyAni,boyEnd;
var invisibleGround;
var ground;
var obstaclesGroup,fruitGroup;
var gorrilla,gorrillaAnim,brick,brickImg;
var appleImg,mangoImg;
var score = 3,scoreAni0,scoreAni1,scoreAni2,scoreAni3;
var life;


function preload() {
  bgImg = loadImage("./Images/Background.png");
  boyAni = loadAnimation("./Images/Boy1.png","./Images/Boy2.png","./Images/Boy3.png","./Images/Boy4.png");
  gorrillaAnim = loadAnimation("./Images/Gorrilla1.png","./Images/Gorrilla2.png","./Images/Gorrilla3.png","./Images/Gorrilla4.png","./Images/Gorrilla5.png");
  brickImg = loadImage("./Images/Brick.png");
  appleImg = loadImage("./Images/Apple.png");
  mangoImg = loadImage("./Images/Mango.png");
  scoreAni0 = loadAnimation("./Images/0.png");
  scoreAni1 = loadAnimation("./Images/1.png");
  scoreAni2 = loadAnimation("./Images/2.png");
  scoreAni3 = loadAnimation("./Images/3.png");
  boyEnd = loadImage("./Images/Boy3.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  ground = createSprite(500 ,height/2,width,height);
  ground.addImage(bgImg);
  ground.scale = 1.5

  boy = createSprite(width/3 - 300,height - 250);
  boy.addAnimation("Boy",boyAni);
  boy.addImage('end',boyEnd);
  boy.scale = 1.7;

  invisibleGround = createSprite(width/2,height - 100,width,50);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  obstacle2Group = new Group();

  life = createSprite(width / 3 - 650,40,50,25);
  life.addAnimation('empty',scoreAni0);
  life.addAnimation('one',scoreAni1);
  life.addAnimation('two',scoreAni2);
  life.addAnimation('three',scoreAni3);
  life.changeAnimation('three');
  mango=createSprite(width,height/2)
  mango.addImage('mango',mangoImg);
  mango.visible=false;
}

function draw() {
  background("white"); 
 
  //image(bgImg,0,0,width,height)

  boy.collide(invisibleGround);

  if(gameState === "play"){
    //ground.velocityX = -10;
    spawnObstacles();
    spawnObstacle2();
    boy.velocityY = boy.velocityY + 5;
    
    if(ground.x<50){
      ground.x=ground.width/2
    }
    ground.velocityX = -4
    if(keyDown("space" ) && boy.y<=600 ){
      boy.velocityY = -70;
    }
    

    for(var i=0;i<obstacle2Group.length;i++){
      if(obstacle2Group.get(i).isTouching(boy)){
        
        obstacle2Group.get(i).changeImage('mango')
        obstacle2Group.get(i).remove();
        
        }

       }
      // for (var j=0;j<brickgrp.length;i++){
      //   if(brickgrp[j].isTouching(boy)){
      //   brickgrp.get(j).changeImage('mango',mangoImg)
      //     mango.visible=true
      //     mango.scale=.4
      //     //gameState = "end";
      //    // brick.changeImage('mango',mangoImg);
      //     score += 1;
      //   }
      // }
    for(var i=0;i<obstaclesGroup.length;i++){
      if(obstaclesGroup.get(i).isTouching(boy)){
        obstaclesGroup.get(i).remove();
        life.changeAnimation('three');
        score -= 1;

        if(score == 2){
          life.changeAnimation('two');
        }
        else if(score == 1){
          life.changeAnimation('one');
        }
        else{
          life.changeAnimation('empty');
        }

        if(score <= 0){
          gameState = "end";

        }
        //gameState = "end";
        //brick.changeImage('mango',mangoImg);
        }
        }

    /*if(){
      obstacle2Group.get(i).changeImage('mango',mangoImg);
    }*/
    
     }
     else if(gameState === "end"){
      ground.velocityX=0
      boy.changeImage('end');
      boy.x=width/3 - 300;
      boy.y=height - 250
      obstaclesGroup.setVelocityEach(0);
      obstacle2Group.setVelocityEach(0);
      obstaclesGroup.destroyEach();
      obstacle2Group.destroyEach();
      gameOver()
     }
  console.log(boy.y);


  

  drawSprites();
  fill("black")
  textSize(30)
  text("Score :  " + score,width - 200,40); 
}

function spawnObstacles(){
  if(frameCount%90 === 0){
    gorrilla = createSprite(width - 100,height-100);
    gorrilla.addAnimation('gorrilla',gorrillaAnim);
    gorrilla.scale = 2;
    gorrilla.velocityX = -12;
    gorrilla.y = Math.round(random(height - 100,height - 500));
    
    obstaclesGroup.add(gorrilla);

  }
}

function spawnObstacle2(){
  if(frameCount%125 === 0){
    brick = createSprite(width-100,height/2-50);
    brick.addImage('brick',brickImg);
    brick.addImage('apple',appleImg);
   
    brick.scale = 0.4;
    brick.velocityX = -10;
    brick.y = Math.round(random(height/2,height/2 - 100));
    obstacle2Group.add(brick);

  }
}

function  gameOver() {
  swal({
    title: "Try Again", 
    text: "You clicked the button!", 
    type: "success",
    buttons: true
  },
function(){ 
    location.reload();
}
);
}

