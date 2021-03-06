  // Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.width = 52;
  this.height = 50;
  this.speed = Math.floor(Math.random() * 200);
};

//sets collision with player
Enemy.prototype.checkCollisions = function() {
  if(player.x < this.x + this.width &&
    player.x + player.width > this.x &&
    player.y < this.y + this.height &&
    player.height + player.y > this.y){
      console.log("collision!!");
      player.x = 305;
      player.y = 400;
      player.lives -= 1;
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if(this.x > 700) {
  this.x = -150;
  }
  this.checkCollisions();
};

//reset property for enemy to reset speed when game is reset
Enemy.prototype.reset = function() {
  this.speed = Math.floor(Math.random() * 200);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = "images/char-princess-girl.png";
  this.x = 305;
  this.y = 400;
  this.width = 52;
  this.height = 50;
  this.score = 0;
  this.lives = 3;
  this.gameOver = false;
};

Player.prototype.update = function() {
  //sets limits for player to remain on screen
  if(this.x < 0){
    this.x = 0;
  } else if (this.x > 620){
    this.x = 620;
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
  //var updateLives = lives.replace("%data%", this.lives);
  var livesElem = document.getElementById("lives");
  livesElem.textContent = lives.replace("%data%", this.lives);

  //win game when reach 400 points
  //conditional for win modal to show
  //if using ctx code, the win if statement would go in player.render to draw the win messae to the board
  if( this.score >= 10 && !this.gameOver) {
    //ctx.font = "bold 40px sans-serif";
    //ctx.fillStyle = "#fef65b";
    //ctx.fillText("You Beat the Bugs!",10,50);
     $("#winModal").modal("show");
     console.log("you win!");
     this.gameOver = true;
   }

  //conditional for lose modal to show
  if (player.lives <= 0 && !this.gameOver) {
  //alert("The bugs beat you! Click OK to play again");
    $("#loseModal").modal("show");
    console.log("youlose!");
    this.gameOver = true;
  }

  //score 10 points for making it to water
  if(this.win()===true){
    this.score += 10;
    console.log("10 points!");
  }
};

//reset property for player when resetting game
Player.prototype.reset = function() {
  this.score = 0;
  this.lives = 3;
  this.x = 305;
  this.y = 400;
  this.gameOver = false;
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
};

//message to appear when player crosses to water
Player.prototype.win = function() {
  if(this.y < 10) {
    this.x = 305;
    this.y = 400;
    return true;
  }
};

//creates Gem class
var Gem = function () {
  //chooses random sprite image
  var gemSprite = ["images/gem-orange.png","images/gem-blue.png","images/star.png","images/heart.png"];
  this.sprite = gemSprite[Math.floor(Math.random() * gemSprite.length)];
  this.x =  Math.floor(Math.random() * (429-1+1)) + 1;
  this.y = Math.floor(Math.random() * (350-70+1)) + 70;
  this.width = 20;
  this.height = 25;
};

//draws gem to board
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

// resets gem to different postion after being gathered
Gem.prototype.reset = function(){
  this.x = Math.floor(Math.random() * (695-1+1)) + 1;
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
       } else if (this.sprite ==="images/star.png"){
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

var Rock = function() {
  this.sprite = "images/rock.png";
  this.width = 80;
  this.height = 80;
  this.x =  Math.floor(Math.random() * (605-1+1)) + 1;
  this.y = Math.floor(Math.random() * (300-70+1)) + 70;
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

//sets collison with player
Rock.prototype.checkCollisions = function() {
  if(player.x < this.x + this.width &&
    player.x + player.width > this.x &&
    player.y < this.y + this.height &&
    player.height + player.y > this.y){
      console.log("Rock collision!!");
      player.x = 305;
      player.y = 400;
      player.score -= 10;
  }
};

//Update the rock, check collions
Rock.prototype.update = function() {
  this.checkCollisions();
};

//function to reset game for entities
function gameReset() {
  player.reset();
  allGems.forEach(function(gem){
    gem.reset();
  });
  allEnemies.forEach(function(enemy) {
      enemy.reset();
  });
  $("#loseModal").modal("hide");
  $("winModal").modal("hide");
}

//event listener to reset the game when user clicks yes to play again
$(document).on("click", ".game-reset", function(){
  gameReset();
});

//event listener to allow player to select new character after winning or losing game
$(document).on("click", ".newSprite", function(){
    $("#spriteModal").modal("show");
    gameReset();
});
//event listener to provide end modal for quit game
$(document).on("click", ".end-game", function(){
  $("#endModal").modal("show");
});

//event listeners to select specific sprite
$(document).on("click", "#boy", function(){
  player.sprite = "images/char-boy.png";
  $("#spriteModal").modal("hide");
});

$(document).on("click", "#cat", function(){
  player.sprite = "images/char-cat-girl.png";
  $("#spriteModal").modal("hide");
});

$(document).on("click", "#horn", function(){
  player.sprite = "images/char-horn-girl.png";
  $("#spriteModal").modal("hide");
});

$(document).on("click", "#pink", function(){
  player.sprite = "images/char-pink-girl.png";
  $("#spriteModal").modal("hide");
});

$(document).on("click", "#princess", function(){
  player.sprite = "images/char-princess-girl.png";
  $("#spriteModal").modal("hide");
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(10, 50));
allEnemies.push(new Enemy(20, 150));
allEnemies.push(new Enemy(50, 230));
allEnemies.push(new Enemy(30, 300));
allEnemies.push(new Enemy(40, 100));
allEnemies.push(new Enemy(10, 250));

// Place the player object in a variable called player
var player = new Player();

//Place all gems created in an array called allGems
var allGems = [];
allGems.push(new Gem());
allGems.push(new Gem());
allGems.push(new Gem());
allGems.push(new Gem());
allGems.push(new Gem());


//place all rocks created in an array called allRocks
var allRocks = [];
allRocks.push(new Rock());
allRocks.push(new Rock());
allRocks.push(new Rock());
allRocks.push(new Rock());
allRocks.push(new Rock());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
  player.handleInput(allowedKeys[e.keyCode]);
});
