var PLAY = 1;

var END = 0;

var gameState = PLAY;

var monkey, monkey_running;

var banana, bananaImage, obstacle, obstacleImage;

var ground, invisibleGround, groundImage;

var bananaGroup, obstacleGroup;

var score;

function preload() {
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );

  bananaImage = loadImage("banana.png");

  obstaclesImage = loadImage("obstacle.png");

  groundImage = loadImage("ground2.png");

  score = 0;
}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 355, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 380, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 390, 400, 10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();
  
  bananaGroup = new Group();
}

function draw() {
  
  background(0, 500, 500);
  
  if(gameState === PLAY){
   
    if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -12;
  }
   monkey.velocityY = monkey.velocityY + 0.8;
    
    ground.velocityX = -4;

    if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
    
    if(bananaGroup.isTouching(monkey)){
      score = score + 2;
      bananaGroup.destroyEach();
      monkey.scale = 0.1+ 0.01; 
    }

  if (frameCount % 80 === 0) {
    bananas();
  }

  if (frameCount % 300 === 0) {
    obstacles();
  }
  }
  monkey.collide(invisibleGround);


  if (obstacleGroup.isTouching(monkey)) { 
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    gameState = END; 
  }
 
  drawSprites();
  
  textSize(17);
  fill("black");
  text("Score: " + score, 500, 50);
}

function obstacles() {
  var obstacles = createSprite(600, 350, 20, 20);
  obstacles.addImage(obstaclesImage);
  obstacles.scale = 0.2;
  obstacles.velocityX = -5;
  obstacleGroup.setLifetimeEach(-1);

  obstacleGroup.add(obstacles);
}

function bananas() {
  banana = createSprite(600, 150, 20, 20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.y = Math.round(random(160, 200, 260, 100))
  bananaGroup.setLifetimeEach(-1);
  
  bananaGroup.add(banana);
}
