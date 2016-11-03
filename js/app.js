// Enemies our player must avoid
var Enemy = function() {
    // load images
    this.sprite = 'images/enemy-bug.png';

    // sets the initial position
    this.enemy_random_spawn();

    // Set the enemy Speed.
    var rand_speed = rand_gen(4)
    this.speed = 50*(1+rand_speed);
};

// *** Helper function that generates number from 0 to num-1
var rand_gen = function(num) {
  var pos = Math.random();
  pos = Math.floor(pos/(1/num));
  return pos;
};

// *** Helper function that generates random initial position of bugs
Enemy.prototype.enemy_random_spawn = function() {
  var rand_pos_x = rand_gen(3);
  this.x = -100*(rand_pos_x+1); //+1 added to avoid spawning from 0th block
  // starts at different "negative" x position to show the effect of coming
  // in to the board at different time points.
  var rand_pos_y = rand_gen(3);
  this.y = 60 + rand_pos_y*80;
  // this.y = 60;
  // this.y = 140;
  // this.y = 210;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 500) {
      this.enemy_random_spawn();
    } else {
      this.x = this.x +this.speed*dt;
    }

    // Handles collision with the player
    if (this.y > player.y - 50 && this.y < player.y + 50 &&
      this.x > player.x - 50 && this.x < player.x + 50 ) {
      player.y = 370;
      // TODO: relevant action needs to follow resulting from collision
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // this.update(2);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.sprite = 'images/char-boy.png';
  // Set the initial position.
  this.x = 200;
  this.y = 370;
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
    this.x - 100 > -5 ? this.x -= 100 : this.nono();
  } else if (allowedKeys === 'right') {
    this.x + 100 < 405 ? this.x += 100 : this.nono();
  } else if (allowedKeys === 'up') {
    this.y - 80 > 0 ? this.y -= 80 : this.nono();
  } else if (allowedKeys === 'down') {
    this.y + 80 < 375 ? this.y += 80 : this.nono();
  } else {
    this.y = this.y;
  }

};

// TODO: Write a helper function that "nono"
Player.prototype.nono = function() {

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
