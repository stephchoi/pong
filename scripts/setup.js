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

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

function Player(x, y, width, height) {
  this.paddle = new Paddle(x, y, width, height);
  this.name = "Player";
};

function Computer(x, y, width, height) {
  this.paddle = new Paddle(x, y, width, height);
  this.name = "Computer";
};

function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
};

Paddle.prototype.render = function() {
  context.rect(this.x, this.y , this.width, this.height);
  context.stroke();
};

Computer.prototype.render = function() {
  this.paddle.render();
  context.fillText("Computer", 15, 15);
  context.stroke();
};

Player.prototype.render = function() {
  var labelPosition = canvas.width - 40;
  this.paddle.render();
  context.fillText("Player", labelPosition, 15);
  context.stroke();
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, this.endAngle, false);
  context.stroke();
};

var render = function(){
  var playerX = canvas.width - 20;
  var playerY = canvas.height/2;

  var computerX = 20;
  var computerY = canvas.height/2 + 10;

  var paddleHeight = 35;
  var paddleWidth = 7;

  var ballX = canvas.width/2;
  var ballY = canvas.height/2;
  var ballRadius = 3;

  player = new Player(playerX, playerY, paddleWidth, paddleHeight);
  computer = new Computer(computerX, computerY, paddleWidth, paddleHeight);
  ball = new Ball(ballX, ballY, ballRadius);

  player.render();
  computer.render();
  ball.render();
};

window.onload = function() {
  createBorder();
  render();
}
