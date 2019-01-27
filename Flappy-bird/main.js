var canvas = document.getElementById('canvas');
var cv = canvas.getContext('2d');
canvas.style.backgroundColor = '#8EB2FF';

var game = true;
const gravity = 0.3;

/***** Class Bird *****/
function Bird(x, y, r) {
  this.x = x;
  this.y = y;
  this.dy = 0;
  this.r = r;
  this.color = '#ffaa33';

  this.update = function() {
    if(this.y-this.r>=0) {
      if(this.y+this.r<canvas.height) {
        this.y += this.dy;
        this.dy += gravity;
      }
      else {
        this.y = canvas.height-this.r;
        game = false;
      }
    }
    else {
      this.y = this.r;
      this.dy = 0;
    }
  }
  this.draw = function() {
    cv.beginPath();
    cv.arc(this.x, this.y, this.r, 0, Math.PI*2);
    cv.stroke();
    cv.fillStyle = this.color;
    cv.fill();
  }
  this.flyUp = function() {
    this.dy = -gravity*15;
  }
}

/***** Class Pipe *****/
function Pipe() {
  this.slit = Math.random()*(canvas.height/2-180)+90;
  this.thick = 60;
  this.x = canvas.width;
  this.y = Math.random()*(canvas.height-this.slit);
  this.color = '#14783F';

  this.update = function() {
    this.x -= 1;
    if(this.x <= -this.thick) pipes.shift();
    if( (bird.x >= this.x-bird.r) && (bird.x <= this.x+this.thick+bird.r) &&
        ((bird.y <= this.y+bird.r) || (bird.y >= this.y+this.slit-bird.r)) )
    game = false;
  }
  this.draw = function() {
    cv.fillStyle = this.color;
    cv.fillRect(this.x, 0, this.thick, this.y);
    cv.fillRect(this.x, this.y+this.slit, this.thick, canvas.height-this.y-this.slit);
  }
}

var bird;
var pipes = [];
var score = 0;
/***** Initial position of bird *****/
function init() {
  bird = new Bird(0.2*canvas.width, 0.5*canvas.height, 20);
}
init();

/***** Show 'game over' screen *****/
function gameOver(score) {
  cv.font = '5em sans-serif';
  cv.textAlign = 'center';
  cv.fillStyle = '#EF2929';
  cv.fillText('Game Over!', canvas.width/2, canvas.height/2);
  cv.fillText(score, canvas.width/2, canvas.height/2-100);
  cv.font = '1.5em sans-serif';
  cv.fillText('press Enter to play again', canvas.width/2, canvas.height/2+70);
  cv.fillText('press Space to fly', canvas.width/2, canvas.height/2+100);
}

/***** Catch keyboard event *****/
window.onkeydown = function(event) {
  if(event.key==" ") bird.flyUp();
  if(event.key=="Enter") {
    init();
    game = true;
    pipes.splice(0, pipes.length);
    score = 0;
  }
}

/***** Infinity loop *****/
function animate() {
  var countFrame = requestAnimationFrame(animate);
  cv.clearRect(0, 0, canvas.width, canvas.height);
  if(game) {
    if(countFrame%300==1) pipes.push(new Pipe());
    bird.update();
    bird.draw();
    for(let i=0; i<pipes.length; i++) {
      pipes[i].update();
      pipes[i].draw();
    }
    score++;
    cv.beginPath();
    cv.font = '2em sans-serif';
    cv.fillStyle = '#EF2929';
    cv.textAlign = 'left';
    cv.fillText('Score: '+score, 20, 50);
    cv.closePath();
  }
  else {
    gameOver(score);
  }
}
animate();