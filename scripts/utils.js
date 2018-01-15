var correctValueForDPR = function (value) {
  return value *= devicePixelRatio
}

var deltaSpeed = function (speed) {
  return (speed * delta) * (60 / 1000)
}

var entitiyIsOutsideCanvasBounds = function (x, y, width, height) {
  const outsideLeft   = x < -(width)
  const outsideRight  = x - width > canvas.width
  const outsideX      = outsideLeft || outsideRight
  const outsideTop    = y < -(height)
  const outsideBottom = y - height > canvas.height
  const outsideY      = outsideTop || outsideBottom

  return outsideX || outsideY
}

var mathClamp = function(value, min, max) {
  return Math.min(Math.max(min, value), max)
}

var random = function (min, max) {
  if (typeof min === 'undefined') {
    min = 0
    max = 1
  } else if (typeof max === 'undefined') {
    max = min
    min = 0
  }

  return (Math.random() * (max - min)) + min
}

var rgba = function (color, alpha) {
  if (alpha === null) {
    alpha = false
  }
  
  if (!alpha) {
    alpha = 1
  }

  return 'rgba(' + color + ', ' + alpha + ')'
}

var randomColor = function () {
  const r = randomInteger(150, 255)
  const g = randomInteger(150, 255)
  const b = randomInteger(150, 255)

  return [r, g, b].join(', ')
}

var randomInteger = function (min, max) {
  if (typeof max === undefined) {
    max = min
    min = 0
  }

  return Math.floor(Math.random() * (max + 1 - min)) + min
}
