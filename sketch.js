var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var zombieGroup;
var bullets = 70;
var gameState = "fight";
var bulletGroup;
var loseSound
var winSound
var explosionSound
var life = 3
var score = 0

function preload()
// images loading 
{
 bgImg = loadImage("assets/bg.jpeg")
shooterImg = loadImage("assets/shooter_2.png")
shooter_shooting = loadImage("assets/shooter_3.png")
heart1Img = loadImage("assets/heart_1.png")
heart2Img = loadImage("assets/heart_2.png")
heart3Img = loadImage("assets/heart_3.png")
zombieImg = loadImage("assets/zombie.png")
loseSound = loadSound("assets/lose.mp3")
winSound = loadSound("assets/win.mp3")
explosionSound = loadSound("assets/explosion.mp3")
}

function setup() {
  // canvas depends on which device using.
createCanvas(windowWidth,windowHeight)
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

// creating sprites
player = createSprite(displayWidth-1150,displayHeight-300,50,50)
player.addImage(shooterImg)
player.scale = 0.3
player.debug = true
player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth-150,40,20,20)
heart1.visible = false
heart1.addImage(heart1Img)
heart1.scale = 0.4

heart2 = createSprite(displayWidth-100,40,20,20)
heart2.visible = false
heart2.addImage(heart2Img)
heart2.scale = 0.4

heart3 = createSprite(displayWidth-150,40,20,20)
heart3.addImage(heart3Img)
heart3.scale = 0.4


zombieGroup = new Group()

bulletGroup = new Group()

}

function draw() {
  background(0)
  
  if(gameState==="fight"){
    if(life===3){
      heart3.visible = true
      heart2.visible = false
      heart1.visible = false
    }
    if(life===2){
      heart3.visible = false
      heart2.visible = true
      heart1.visible = false
    }
    if(life===1){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = true
    }
    if(life===0){
      gameState = "lost"
    }
    if(score===100){
      gameState = "won"
      winSound.play()
    }

  
  
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y - 30

  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y + 30

  }
  if(keyWentDown("space")){
player.addImage(shooter_shooting)
bullet = createSprite(displayWidth-1150, player.y-30, 20, 10)
bullet.velocityX = 20
bulletGroup.add(bullet)
player.depth = bullet.depth
player.depth = player.depth + 2
bullets = bullets - 1
explosionSound.play()

  }
  else if(keyWentUp("space")){
player.addImage(shooterImg)
  }
if(bullets === 0){
gameState = "bullet"
loseSound.play()
}

// if zombie touches a player 
  if(zombieGroup.isTouching(player)){
    loseSound.play()
for(var i=0; i< zombieGroup.length;i++ ){
  if(zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy()
life = life - 1
  } 
}
  }

if(zombieGroup.isTouching(bulletGroup)) {
  for(var i=0; i< zombieGroup.length;i++ ){
    if(zombieGroup[i].isTouching(bulletGroup)){
  zombieGroup[i].destroy()
  bulletGroup.destroyEach()
  explosionSound.play()
  score = score + 2
    } 
  }
}

enemy()
  }
  drawSprites()

  textSize = 20
  fill("white")
  text("bullets = "+ bullets, displayWidth - 210, displayHeight/2 - 250)
  text("score = "+ score, displayWidth - 200, displayHeight/2 - 220)
  text("life = "+ life, displayWidth - 200, displayHeight/2 - 280)
  if(gameState==="lost"){
    textSize(100)
    fill("red")
    text(" You lost", 400, 400)
    player.destroy()
    zombieGroup.destroyEach()
  }
else if(gameState==="won"){
  textSize(100)
  fill("yellow")
  text("You won", 400, 400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState==="bullet"){
  fill("yellow")
  //textSize(50)
  text("You have run out of bullets",470,410)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()

}


}

// after every 50 frames there is one zombie printed on the screen
function enemy(){
  if(frameCount%50===0){
zombie = createSprite(random(500,1100),random(100,500),40,40)
zombie.addImage(zombieImg)
zombie.scale = 0.15
zombie.velocityX = -3 
zombie.debug = true
zombie.setCollider("rectangle",0,0,400,400)
zombie.lifetime = 400  
zombieGroup.add(zombie)



}
}
