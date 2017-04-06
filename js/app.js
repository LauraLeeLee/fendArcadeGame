// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 200);
    allEnemies.push(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 500) {
     this.x = -50;
    }
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
};

//sets limits for player to remain on screen
Player.prototype.update = function(){
  if(this.x < 0){
    this.x = 0;
  } else if (this.x > 500){
    this.x = 500;
  } else if (this.y < 0){
    this.y = 0;
  }  else if (this.y > 600){
    this.y = 600;
  }
};

Player.prototype.handleInput = function(key) {
    switch (key) {
    case left:
      this.x = this.x - 30;
    break;

    case right: // Up
      this.x = this.x + 30;
    break;

    case up:
      this.y = this.y - 30;
    break;

    case down:
      this.y = this.y + 30;
    break;
};

//draws player in the game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(10, 50));
allEnemies.push(new Enemy(5, 180));
allEnemies.push(new Enemy(20, 100));
//allEnemies.push(new Enemy(30, 150));
allEnemies.push(new Enemy(50, 230));

// Place the player object in a variable called player
var player = new Player();


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
