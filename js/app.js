// Enemies our player must avoid
var Enemy = function() {
    // load images
    this.sprite = 'images/enemy-bug.png';

    // sets the initial position
    this.x = 0;
    // generates random number from 1 to 4
    var pos = rand_gen(3);

    this.y = 60 + pos*80;
    // this.y = 60;
    // this.y = 140;
    // this.y = 210;

    // TODO: Set the enemy Speed.
    // this.speed =
};

// ***Helper function that generates number from 0 to num-1
var rand_gen = function(num) {
  var pos = Math.random();
  pos = Math.floor(pos/(1/num));
  return pos;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x +1*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // this.update(2);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  // Set the initial position.
  this.x = 0;
  this.y = 0;
};

Player.prototype.update = function(dt) {
  // TODO: The update method for the Player (can be similar to the one for the Enemy)
};

Player.prototype.render = function() {
  this.handleInput();
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {

  if (allowedKeys === 'left') {
    this.x = this.x - 1;
  } else if (allowedKeys === 'right') {
    this.x = this.x + 1;
  } else if (allowedKeys === 'up') {
    this.y = this.y - 1;
  } else if (allowedKeys === 'down') {
    this.y = this.y + 1;
  } else {
    this.y = this.y;
  }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
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
