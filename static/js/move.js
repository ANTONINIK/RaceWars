const movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

window.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 65: //A
      movement.left = true
      break
    case 87: //W
      movement.up = true
      break
    case 68: //D
      movement.right = true
      break
    case 83: //S
      movement.down = true
      break
  }
})

window.addEventListener('keyup', event => {
  switch (event.keyCode) {
    case 65: //A
      movement.left = false
      break
    case 87: //W
      movement.up = false
      break
    case 68: //D
      movement.right = false
      break
    case 83: //S
      movement.down = false
      break
  }
})

setInterval(() => {
  socket.emit('movement', movement)
}, 1000 / 75)
