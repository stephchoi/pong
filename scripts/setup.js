var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var createBorder = function() {
  var x = canvas.width;
  var y = canvas.height;
  var lineLength = 30;

  context.lineWidth = 4;
//top left corner
  context.moveTo(0,0);
  context.lineTo(0,lineLength);
  context.moveTo(0,0);
  context.lineTo(lineLength,0);
//top right
  context.moveTo(x, 0);
  context.lineTo(x-lineLength, 0);
  context.moveTo(x,0);
  context.lineTo(x, lineLength);
//bottom left
  context.moveTo(0,y);
  context.lineTo(0,y-lineLength);
  context.moveTo(0,y);
  context.lineTo(lineLength,y);
//bottom right
  context.moveTo(x, y);
  context.lineTo(x-lineLength, y);
  context.moveTo(x,y);
  context.lineTo(x, y-lineLength);

  context.stroke()
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 5;
};

function Player(x, y, width, height) {
  this.paddle = new Paddle(x, y, width, height);
  this.name = "Player";
  this.score = 0;
};

function Computer(x, y, width, height) {
  this.paddle = new Paddle(x, y, width, height);
  this.name = "Computer";
  this.score = 0;
};

function Ball() {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.radius = 3;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.speedX = 4;
  this.speedY = 2;
};

Paddle.prototype.render = function() {
  context.rect(this.x, this.y , this.width, this.height);
  context.stroke();
};

Computer.prototype.render = function() {
  this.paddle.render();
  context.fillText("Computer", 15, 15);
  context.fillText(this.score, 15, 20);
  context.stroke();
};

Player.prototype.render = function() {
  var labelPosition = canvas.width - 40;
  this.paddle.render();
  context.fillText("Player", labelPosition, 15);
  context.fillText(this.score, labelPosition, 20);
  context.stroke();
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, this.endAngle, false);
  context.stroke();
};

Paddle.prototype.move = function(direction) {
  var result = this.y + direction * this.speed;
  if (result > 10 && result < canvas.height - 50) {
    this.y = result;
  };
};

Ball.prototype.move = function() {
  this.x += this.speedX ;
  this.y += this.speedY ;

  if ((this.x + this.radius) >= player.paddle.x && (this.y > player.paddle.y && this.y < player.paddle.y + player.paddle.height)) {
    this.speedX *= -1;
  } else if((this.x - this.radius) <= (computer.paddle.x +computer.paddle.width) && (this.y > computer.paddle.y && this.y < computer.paddle.y + computer.paddle.height)){
    this.speedX *= -1;
  } else if (this.y + this.radius >= canvas.height - 5 || this.y - this.radius <= 5) {
    this. speedY *= -1;
  } else if (this.x > canvas.width) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    computer.score +=1;
  } else if (this.x < 0) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    player.score += 1;
  }
};

var playerX = canvas.width - 20;
var playerY = canvas.height/2;

var computerX = 20;
var computerY = canvas.height/2 + 10;

var paddleHeight = 35;
var paddleWidth = 7;

player = new Player(playerX, playerY, paddleWidth, paddleHeight);
computer = new Computer(computerX, computerY, paddleWidth, paddleHeight);
ball = new Ball;

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

//renders the player & computer paddles, and the ball each frame
var step = function() {
  context.clearRect(0,0, canvas.width, canvas.height);
  createBorder();
  player.render();
  computer.render();
  ball.render();
  ball.move();
  animate(step);
};

window.addEventListener('keydown', function(event) {
  var direction =  -(39 - event.keyCode);
  player.paddle.move(direction);
});

window.onload = function() {
  animate(step);
};
