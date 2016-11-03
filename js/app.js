// ------- ENEMY BEGINS HERE
var Enemy = function() {
    // load images
    this.sprite = 'images/enemy-bug.png';

    // set initial position
    this.enemy_random_spawn();

    // set enemy speed
    var rand_speed = rand_gen(4)
    this.speed = 50 * (1 + rand_speed);
};

var board_edge_right = 500;
var board_edge_left = -5;
var board_edge_top = 0;
var board_edge_bottom = 375;

Enemy.prototype.update = function(dt) {
    var player_right_edge = player.x + 50;
    var player_left_edge = player.x - 50;
    var player_up_edge = player.y + 50;
    var player_down_edge = player.y - 50;

    // kills and respawns an enemy if it reaches the edge
    if (this.x > board_edge_right) {
        this.enemy_random_spawn();
    } else {
        this.x += this.speed * dt;
    }

    // handles collision with the player
    if (this.y > player_down_edge && this.y < player_up_edge &&
        this.x > player_left_edge && this.x < player_right_edge) {
        player.initial_pos();
        // TODO: add more features resulting from collision
        // collision();
    }
};

// helper_fun 1: generates 'num' number of integers from 0
var rand_gen = function(num) {
    var pos = Math.random();
    pos = Math.floor(pos / (1 / num));
    return pos;
};

//  helper_fun 2: generates random initial position of enemie
Enemy.prototype.enemy_random_spawn = function() {
    var rand_pos_x = rand_gen(3);
    this.x = -100 * (rand_pos_x + 1); //+1 to ensure spawning outside board
    var rand_pos_y = rand_gen(3);
    this.y = 60 + rand_pos_y * 80;
    // from trial and error, valid y positions are 60, 140, 210
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ------- PLAYER BEGINS HERE
var Player = function() {
    // load images
    this.sprite = 'images/char-boy.png';

    // set initial position
    this.initial_pos();
};

// ???? not sure if I am using this function right.
// Why not just put this.handleInput(); inside #render and ignore this one? for consistency?
Player.prototype.update = function() {
    this.handleInput();
};

Player.prototype.render = function() {
    this.update();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'left') {
        this.x - 100 > board_edge_left ? this.x -= 100 : this.nono();
    } else if (allowedKeys === 'right') {
        this.x + 100 < board_edge_right ? this.x += 100 : this.nono();
    } else if (allowedKeys === 'up') {
        this.y - 80 > board_edge_top ? this.y -= 80 : this.win();
    } else if (allowedKeys === 'down') {
        this.y + 80 < board_edge_bottom ? this.y += 80 : this.nono();
    } else {
        this.y = this.y;
    }
};

// player initial position
Player.prototype.initial_pos = function() {
    this.x = 200;
    this.y = 370;
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

// initiate player and enemies
var allEnemies = [new Enemy(), new Enemy()];
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
