var canvas = document.getElementById('canvas');
var cv = canvas.getContext('2d');

canvas.style.backgroundColor = 'black';
cv.translate(canvas.width/2, canvas.height/2);

function Star(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.draw = function() {
    cv.fillStyle = '#eee';
    cv.fill();
    cv.beginPath();
    cv.strokeStyle = '#eee';
    sx = this.x/this.z*canvas.width;
    sy = this.y/this.z*canvas.height;
    cv.arc(sx, sy, canvas.width/this.z, 0, Math.PI*2);
    cv.stroke();
  }
  this.update = function() {
    if(this.z>1) this.z -= 1;
    else {
      this.z = Math.random()*canvas.width;
      this.x = Math.random()*canvas.width-canvas.width/2;
      this.y = Math.random()*canvas.height-canvas.height/2;
    }
  }
}

var stars = [];
for(i=0; i<300; i++) {
  var x = Math.random()*canvas.width-canvas.width/2;
  var y = Math.random()*canvas.height-canvas.height/2;
  var z = Math.random()*canvas.width;
  stars.push(new Star(x, y, z));
}

function animate() {
  requestAnimationFrame(animate);
  cv.clearRect(-canvas.width, -canvas.height, 2*canvas.width, 2*canvas.height);
  for(i=0; i<stars.length; i++) {
    stars[i].draw();
    stars[i].update();
  }
}
animate();
