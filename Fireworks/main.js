var canvas = document.getElementById('canvas');
var cv = canvas.getContext('2d');

canvas.width = window.innerWidth; canvas.height = window.innerHeight;

var colorArray = ['#ffaa33', '#99ffaa', '#00ff00', '#94b0dd', '#ff1100'];
var gravity = 1;
var loss = 0.8;
var tick = 0, timerTotal = 100;
var x = undefined, y = undefined;

var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('click', function($event) {
  mouse.x = $event.pageX - canvas.offsetLeft;
	mouse.y = $event.pageY - canvas.offsetTop;
  createParticles(mouse.x, mouse.y);
});

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.angle = Math.random()*2*Math.PI;
  this.speed = Math.random()*3;
  this.life = Math.random()*80+20;
  this.r = Math.random()*5+5;
  this.t = 0;
  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
  this.draw = function() {
    cv.beginPath();
    cv.strokeStyle = this.color;
    cv.arc(this.x, this.y, this.r, 0, Math.PI*2);
    cv.stroke();
    cv.fillStyle = this.color;
    cv.fill();
  }
  this.update = function(index) {
    this.x += Math.cos(this.angle)*this.speed*loss;
    this.y += Math.sin(this.angle)*this.speed*loss + gravity;
    this.r *= 0.97;
    this.t += 1;
    if(this.t>=this.life) particles.splice(index, 1);
  }
}

var particles = [];
function createParticles(x, y) {
  for(let i=0; i<250; i++) {
    if(particles.length<=750) {
      particles.push(new Particle(x, y));
    }
  }
}
createParticles(x, y);

function animate() {
  requestAnimationFrame(animate);
  cv.fillStyle = 'rgba(0, 0, 0, 0.25)';
  cv.fillRect(0, 0, canvas.width, canvas.height);
  for(i=0; i<particles.length; i++) {
    particles[i].draw();
    particles[i].update(i);
  }
  if(tick<timerTotal) tick++;
  else {
    var x = Math.random()*canvas.width*0.8+canvas.width*0.1;
    var y = Math.random()*canvas.height*0.7;
    tick = 0;
    timerTotal = Math.random()*100+80;
    createParticles(x, y);
  }
}
animate();
