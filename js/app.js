// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 52;
    this.height = 50;
    this.speed = Math.floor(Math.random() * 200);
};

//sets collision with player
Enemy.prototype.checkCollisions = function(){
     if(player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y){
          console.log("collision!!");
          player.x = 215;
          player.y = 400;
          player.lives-=1;
        }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 500) {
     this.x = -150;
    }
    this.checkCollisions();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-princess-girl.png';
  this.x = 215;
  this.y = 400;
  this.width = 52;
  this.height = 50;
  this.score = 0;
  this.lives = 3;
};

Player.prototype.update = function(){
  //sets limits for player to remain on screen
  if(this.x < 0){
    this.x = 0;
  } else if (this.x > 420){
    this.x = 420;
  } else if (this.y < 0){
    this.y = 0;
  }  else if (this.y > 435){
    this.y = 435;
  }

  //sets value of score and lives
  var score = "Score: %data%";
  //update %data% with current values
  var scoreElem = document.getElementById("score");
  scoreElem.textContent = score.replace("%data%", this.score);
  var lives = "Lives: %data%";
  var updateLives = lives.replace("%data%", this.lives);
  var livesElem = document.getElementById("lives");
  livesElem.textContent = lives.replace("%data%", this.lives);

  //score 10 points for making it to water
  if(this.win()===true){
    this.score += 10;
    console.log("10 points!");
  };
};

//sets the direction and distance for player movement
Player.prototype.handleInput = function(key) {
  switch (key) {
    case "left":
      this.x = this.x - 30;
    break;

    case "right": // Up
      this.x = this.x + 30;
    break;

    case "up":
      this.y = this.y - 30;
    break;

    case "down":
      this.y = this.y + 30;
    break;
  }
};

//draws player and anything associated with player in the game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.win();
    //win game when reach 400 points
    if( this.score >= 400) {
      ctx.font = "bold 40px sans-serif";
      ctx.fillStyle = "#fef65b";
      ctx.fillText("You beat the bugs!!",65,100);
      console.log("you win!");
    };
    if (player.lives <= 0) {
    //alert("The bugs beat you! Click OK to play again");
    $("loseModal").modal("show");
    this.lives = 3;
  }
};

//message to appear when player crosses to water
Player.prototype.win = function() {
  if(this.y < 10) {
    this.x = 215;
    this.y = 400;
    return true;
  };
};

//creates Gem class
var Gem = function () {
  //chooses random sprite image
  var gemSprite = ["images/gem-orange.png","images/gem-blue.png","images/star.png","images/heart.png"];
  this.sprite = gemSprite[Math.floor(Math.random() * gemSprite.length)];
  this.x =  Math.floor(Math.random() * (429-1+1)) + 1;
  this.y = Math.floor(Math.random() * (350-70+1)) + 70;
  this.width = 20;
  this.height = 30;
};

//draws gem to board
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

// resets gem to different postion after being gathered
Gem.prototype.reset = function(){
  this.x = Math.floor(Math.random() * (429-1+1)) + 1;
  this.y = Math.floor(Math.random() * (350-50+1)) + 50;
};

Gem.prototype.checkGemGather = function() {
  if(player.x < this.x + this.width &&
     player.x + player.width > this.x &&
     player.y < this.y + this.height &&
     player.height + player.y > this.y){
       console.log("gem collected");
       if(this.sprite === "images/gem-orange.png") {
         player.score += 20;
       } else if(this.sprite === "images/gem-blue.png"){
         player.score +=30;
       } else if (this.spirte ==="images/star.png"){
         player.score += 40;
       } else if (this.sprite ==="images/heart.png"){
         player.score +=50;
       }
       this.reset();
     }
};

Gem.prototype.update = function() {
  this.checkGemGather();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(10, 50));
allEnemies.push(new Enemy(20, 150));
allEnemies.push(new Enemy(50, 230));
allEnemies.push(new Enemy(30, 300));

// Place the player object in a variable called player
var player = new Player();

//Place all gems created in an array called allGems
var allGems = [];
allGems.push(new Gem());
allGems.push(new Gem());
allGems.push(new Gem());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
  player.handleInput(allowedKeys[e.keyCode]);
});
