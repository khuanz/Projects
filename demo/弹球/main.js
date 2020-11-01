// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 4)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
    random(0, 255) + ', ' +
    random(0, 255) + ', ' +
    random(0, 255) + ')';
}

// 创建小球模型 
// x,y坐标，velX,velY速度 color颜色 size大小
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 画球  构建draw原型方法
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function () {
  // 判断是否大于最大宽度
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX)
  }
  // 判断是否小于最大宽度
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX)
  }
  // 判断是否大于最小宽度

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY)
  }
  // 判断是否小于最小高度
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY)
  }
  this.x += this.velX;
  this.y += this.velY;
}
// 碰撞检测
Ball.prototype.collisionDetect = function () {
  // console.log(this)
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}
// 创建一个储存小球的容器
var balls = [];
// 创建运动函数
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, .29)';
  ctx.fillRect(0, 0, width, height);
  // 小球数量小于下面值时不在创建
  while (balls.length < 25) {
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      random(10, 20));
    balls.push(ball);

  }
  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}

loop();

// var test = new Ball(114, 114, 3, 3, 'blue', 5);
// test.draw()