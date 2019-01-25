var canvas = document.getElementById('canvas');
var cv = canvas.getContext('2d');

var colorArray = ['#ffaa33', '#99ffaa', '#00ff00', '#4411aa', '#ff1100'];
var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', function($event) {
  mouse.x = $event.x;
  mouse.y = $event.y;
});

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
    if(this.y+this.r>canvas.height || this.y-this.r<0) this.dy = -this.dy;
    this.x += this.dx; this.y += this.dy;
    if(Math.abs(mouse.x-this.x)<50 && Math.abs(mouse.y-this.y)<50) {
      if(this.r<30) this.r += 1;
    } else {
      if(this.r>4) this.r -= 1;
    }
  }
}

var circleArray = [];
for(i=0; i<500; i++) {
  var x = Math.random()*0.8*canvas.width+0.1*canvas.width, y = Math.random()*0.8*canvas.height+0.1*canvas.height;
  var dx = Math.random()*2-1, dy = Math.random()*2-1;
  var r = 4;
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
