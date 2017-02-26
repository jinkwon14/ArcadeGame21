var board_edge_right = 650;
var board_edge_left = -5;
var board_edge_top = 0;
var board_edge_bottom = 750;

var Heart = function() {
  this.sprite = 'images/heart.png';
  this.size = 35;
  this.count = 5;
}

Heart.prototype.deduct = function() {
  this.count -= 1;
}

// Initialize Enemy class
var Enemy = function() {
    // set enemy image
    this.sprite = 'images/enemy_front.png';
    // set initial positions, enemy.x and enemy.y
    this.enemy_random_spawn();
    // set enemy speed
    var rand_speed = rand_gen(4)
    this.speed = 50 * (1 + rand_speed);
    // set enemy size
    var possible_sizes = [50, 100, 150];
    var rand_idx = rand_gen(3);
    console.log(rand_idx);
    this.size = possible_sizes[rand_idx];
};

var allEnemies = [new Enemy(), new Enemy()];

Enemy.prototype.enemy_random_spawn = function() {
    var rand_pos_x = rand_gen(3);
    // Initial x positions determine when they appear on the game board
    this.x = -100 * (rand_pos_x + 1); //+1 to ensure spawning outside board
    var rand_pos_y = rand_gen(3);
    this.y = 60 + rand_pos_y * 80;
    // from trial and error, valid y positions are 60, 140, 210
};

// Generates num number of random integer from 0
var rand_gen = function(num) {
    var pos = Math.random();
    pos = Math.floor(pos / (1 / num));
    return pos;
};

var Player = function() {
    // load images
    this.sprite = 'images/Jelly_front.png';
    this.size = 80;
    // set initial position
    this.initial_pos();
};

var player = new Player();

Player.prototype.initial_pos = function() {
  this.x = 325;
  this.y = 375;
};


Enemy.prototype.update = function(dt) {

    // kills and respawns an enemy if it reaches the edge
    if (this.x > board_edge_right) {
        this.enemy_random_spawn();
    } else {
        this.x += this.speed * dt;
    }

    var player_right_edge = player.x + 50;
    var player_left_edge = player.x - 50;
    var player_up_edge = player.y + 50;
    var player_down_edge = player.y - 50;

    // handles collision with the player
    if (this.y > player_down_edge && this.y < player_up_edge &&
        this.x > player_left_edge && this.x < player_right_edge) {
        player.initial_pos();
        // TODO: add more features resulting from collision
        // collision();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.size, this.size);
};

// Heart
// ???? not sure if I am using this function right.
// Why not just put this.handleInput(); inside #render and ignore this one? for consistency?
Player.prototype.update = function() {
    this.handleInput();
};

Player.prototype.render = function() {
    this.update();
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x, this.y,
      this.size, this.size);
};


// TODO: notify invalid moves by either shacking or flashing
Player.prototype.nono = function() {

};

// resulting outcomes when the player wins (reaches the water)
Player.prototype.win = function() {
    // add an enemy to add difficulty
    allEnemies.push(new Enemy());

    // player go return back to initial position
    this.initial_pos();

    // TODO: add more rewarding award for the winner if player accomplishes the goal set number of times
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'left') {
        this.x - 50 > board_edge_left ? this.x -= 50 : this.nono();
    } else if (allowedKeys === 'right') {
        this.x + 50 < board_edge_right ? this.x += 50 : this.nono();
    } else if (allowedKeys === 'up') {
        this.y - 50 > board_edge_top ? this.y -= 50 : this.win();
        this.sprite = 'images/Jelly_back.png';
    } else if (allowedKeys === 'down') {
        this.y + 50 < board_edge_bottom ? this.y += 50 : this.nono();
        this.sprite = 'images/Jelly_front.png';
    } else {
        this.y = this.y;
    }
};
