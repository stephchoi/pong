Paddle.prototype.move = function(direction) {
  var result = this.y + direction * this.speed;
  if (result > 10 && result < canvas.height - 50) {
    this.y = result;
  };
};
