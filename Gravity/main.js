var canvas = document.getElementById('canvas');
var cv = canvas.getContext('2d');

var g = 0.2;
var damped = 0.98
var colorArray = ['#ffaa33', '#99ffaa', '#00ff00', '#4411aa', '#ff1100'];

function Circle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
  this.draw = function() {
    cv.beginPath();
    cv.strokeStyle = 'red';
    cv.arc(this.x, this.y, this.r, 0, Math.PI*2);
    cv.stroke();
    cv.fillStyle = this.color;
    cv.fill();
  }
  this.update = function() {
    if(this.x+this.r>canvas.width || this.x-this.r<0) this.dx = -this.dx;
    if(this.y+this.r>canvas.height || this.y-this.r<0) this.dy = -this.dy*damped;
    this.x += this.dx;
    this.y += this.dy; this.dy += g;
  }
}

var circleArray = [];
for(i=0; i<100; i++) {
  var x = Math.random()*0.8*canvas.width+0.1*canvas.width;
  var y = Math.random()*0.8*canvas.height+0.1*canvas.height;
  var r = Math.random()*28+2;
  var dx = Math.random()-0.5;
  var dy = Math.random()-0.5;
  circleArray.push(new Circle(x, y, dx, dy, r));
}

function animate() {
  requestAnimationFrame(animate);
  cv.clearRect(0, 0, canvas.width, canvas.height);
  for(i=0; i<circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }
}
animate();
