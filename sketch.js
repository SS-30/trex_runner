p5.disableFriendlyErrors=true;
var trex, trex_running, edges;
var groundImage,invisible;
var cloud,cloudImage
var ob1,ob2,ob3,ob4,ob5,ob6
var ob
var rn
var score=0
var state="start"
var restart,gameover
var restartImage,gameoverImage
var trex_colided
var checkPoint,jump,die
function preload(){
  trex_running =        loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage= loadImage("cloud.png")
  ob1= loadImage("obstacle1.png")
  ob2= loadImage("obstacle2.png")
  ob3= loadImage("obstacle3.png")
  ob4= loadImage("obstacle4.png")
  ob5= loadImage("obstacle5.png")
  ob6= loadImage("obstacle6.png")
  restartImage=loadImage("restart.png")
  gameoverImage=loadImage("gameOver.png")
  trex_colided=loadAnimation("trex_collided.png")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkPoint=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(displayWidth,displayHeight);
  trex = createSprite(100,150,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.x = 50
  
  trex.addAnimation("colide",trex_colided)
  ground= createSprite(50,280,200,5 )
  ground.addImage(groundImage)
  edges = createEdgeSprites();
  
  invisible = createSprite(50,290,200,5)
  invisible.visible=false
  
   cloudGroup=new Group();
   obstacleGroup=new Group();
  
  trex.setCollider("circle",0,0,50)
  trex.debug=false
  
  restart=createSprite(250,150,10,10)
  restart.addImage(restartImage);
  restart.scale=1
  gameover=createSprite(250,100,20,20)
  gameover.addImage(gameoverImage);
  gameover.scale=0.7
}



function draw(){
  background("black");
   textSize(20)
  text("score"+score,450,150)
  
  if(state==="start"){
 
  score=score+Math.round(frameCount/150)
  if(score%500===0 &&score>0){
    checkPoint.play()
    console.log("play")
  }

  ground.velocityX= -7
  
  if (ground.x<0){
    ground.x=ground.width/2
  }
  
  if(keyDown("UP_ARROW") && trex.y >=250){
    trex.velocityY = -10;
    jump.play()
  }
  trex.velocityY = trex.velocityY + 0.5;
       
  if (obstacleGroup.isTouching(trex)){
      state="end";
      die.play()
  
    }

  if(score===1000){
    state="win";
    die.play()
  }
  gameover.visible=false
  restart.visible=false
  drawObstacles();
  drawCloud();
  }
  
  else if(state==="end"){
    trex.velocityY=0
    ground.velocityX=0
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    trex.changeAnimation("colide",trex_colided)
    
    cloudGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    
    gameover.visible=true
    restart.visible=true
    
    if(mousePressedOver(restart)){
      reset()
    }
  }

  if(state==="win"){
    textSize(50)
    text("you have won",250,100)
    trex.velocityY=0
    ground.velocityX=0
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    trex.changeAnimation("colide",trex_colided)
    
    cloudGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    restart.visible=true
    
    if(mousePressedOver(restart)){
      reset()
    }
  }
  
  trex.collide(invisible)
  

  drawSprites();
}




 function drawCloud(){
   if(frameCount% 50===0){
   cloud=createSprite(550,50,10,10)
   cloud.velocityX=-7
   cloud.addImage(cloudImage);
   cloud.scale=0.5
   cloud.y=Math.round(random(20,100))
   cloud.depth=trex.depth
   trex.depth=trex.depth+1
   cloud.lifetime=86
   cloudGroup.add(cloud)
  }

 }

 function drawObstacles(){
  if(frameCount%100===0){
    ob=createSprite(600,270,10,10)
    ob.velocityX=-(7+5*score/500)
    rn=Math.round(random(1,6))
    ob.scale=0.5
    switch(rn){
      case 1:ob.addImage(ob1)
        break;
      case 2:ob.addImage(ob2)
        break;
      case 3:ob.addImage(ob3)
        break;
      case 4:ob.addImage(ob4)
        break;
      case 5: ob.addImage(ob5)
        break;
      case 6:ob.addImage(ob6)
        break;
       
    }
    ob.lifetime=120
    obstacleGroup.add(ob)
  } 
 }

function reset(){
  state="start"
  score=0
 
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  trex.changeAnimation("running",trex_running)

}
