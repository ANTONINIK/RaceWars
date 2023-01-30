const WIDTH = 512
const HEIGHT = 288
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const framerate = document.getElementById('fps')
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
canvas.style.width = WIDTH
canvas.style.height = HEIGHT
canvas.width = DPI_WIDTH
canvas.height = DPI_HEIGHT
const socket = io()

const playerCar = new Car({
  id: socket.id,
  name: 'Anonymous'
})

let track = new Track()
let enemyCars = null

socket.on('track', points => {
  track.points = points
  track.update()
})

socket.on('state', state => (enemyCars = state))

socket.on('bestLaps', data => {
  mapBestLaps = new Map(JSON.parse(data))
  mapBestLaps = new Map([...mapBestLaps.entries()].sort((a, b) => a[1] - b[1]))
})

function animate(timestamp) {
  window.requestAnimationFrame(animate)
  const currentTime = timestamp

  //draw background
  ctx.beginPath()
  ctx.fillStyle = 'rgb(36, 38, 48)'
  ctx.fillRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
  ctx.closePath()

  switch (gameMode) {
    case 0:
      //track
      drawTrack(ctx, track, false)

      //player
      playerCar.controller(movement)
      playerCar.update()
      playerCar.collision(track)
      socket.emit('update', playerCar) //update
      if (playerCar) {
        drawCar(ctx, playerCar)
      }

      //telemetry
      telemetry.start(playerCar, track.checkPoints, socket)

      //enemy
      if (enemyCars) {
        for (const id in enemyCars) {
          if (socket.id != id) {
            const enemyCar = enemyCars[id]
            drawCar(ctx, enemyCar, false)
          }
        }
      }
      break
    case 1:
      drawTrack(ctx, track, true)
      break
    default:
      telemetry.stop()
  }
  if (lastTime) {
    framerate.textContent = `FPS: ${(1000 / (currentTime - lastTime)).toFixed(
      1
    )}`
  }
  lastTime = currentTime
}

let lastTime = null
animate()
