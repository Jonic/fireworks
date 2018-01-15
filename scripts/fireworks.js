"use strict"

var canvas,
  context,
  delta,
  devicePixelRatio,
  particles,
  fps,
  lastFrameTime,
  screen
  
canvas    = document.getElementById('fireworks-canvas')
context   = canvas.getContext('2d')
particles = []
screen    = {
  height: document.body.clientHeight,
  width: document.body.clientWidth,
}

canvas.height       = screen.height
canvas.width        = screen.width  
canvas.style.height = screen.height + 'px'
canvas.style.width  = screen.width + 'px'

var createFirework = function () {
  var x = randomInteger(100, screen.width - 100)
  var y = randomInteger(100, screen.height - 100)

  for (var i = 0; i < randomInteger(50, 200); i += 1) {
    var particle = new Particle(x, y)
    particles.push(particle)
  }
  
  window.setTimeout(function () {
    createFirework()
  }, randomInteger(500, 2000))
}

var Particle = function (x, y) {
  this.alpha    = 1
  this.angle    = random(0, Math.PI * 2)
  this.color    = randomColor()
  this.decay    = 0.015
  this.friction = 0.97
  this.gravity  = 4
  this.position = {
    x: x,
    y: y,
  }
  this.size     = random(0.5, 5)
  this.velocity = randomInteger(5, 10)
}

Particle.prototype.draw = function () {
  context.fillStyle = rgba(this.color, this.alpha)
  context.fillRect(this.position.x, this.position.y, this.size, this.size)
}

Particle.prototype.update = function (index) {
  this.velocity   *= this.friction
  this.position.x += Math.cos(this.angle) * this.velocity
  this.position.y += Math.sin(this.angle) * this.velocity + this.gravity
  this.alpha      -= this.decay
  
  if (this.alpha <= this.decay) {
    particles.splice(index, 1)
  }
}

var animationLoop = function (now) {
  document.body.removeEventListener('click', animationLoop)
  document.querySelector('.c-intro').classList.add('c-intro--hidden')
  
  delta         = now - lastFrameTime
  fps           = Math.round(1000 / delta)
  lastFrameTime = now
  
  context.globalCompositeOperation = 'destination-out'
  context.fillStyle = 'rgba(0, 0, 0, 0.5)'
  context.fillRect(0, 0, screen.width, screen.height)
  context.globalCompositeOperation = 'lighter'

  for (var i = 0; i < particles.length; i += 1) {
    particles[i].draw()
    particles[i].update(i)
  }

  if (particles.length <= 0) {
    createFirework()
  }
  
  window.requestAnimationFrame(animationLoop)
}

document.body.addEventListener('click', animationLoop)
