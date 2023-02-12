import drawCar from './js/drawCar.js'
import drawTrack from './js/drawTrack.js'
import movement from './js/move.js'
import { gameMode } from './js/menu.js'
import { playerCar, enemyCars, track, telemetry } from './js/entities.js'

const WIDTH = 512
const HEIGHT = 288
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
canvas.style.width = WIDTH
canvas.style.height = HEIGHT
canvas.width = DPI_WIDTH
canvas.height = DPI_HEIGHT
track.subscribeToEvents(canvas)

let previousTimeStamp = null
function animate(timestamp) {
  window.requestAnimationFrame(animate)
  if (previousTimeStamp == null) {
    previousTimeStamp = timestamp
  }
  let dt = (timestamp - previousTimeStamp) / 1000
  previousTimeStamp = timestamp

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

      if (playerCar) {
        drawCar(ctx, playerCar)
        playerCar.controller(dt, movement)
        playerCar.update(dt)
        playerCar.collision(track)
      }

      telemetry.start(playerCar, track)

      if (enemyCars) {
        enemyCars.forEach(({ car, movement }) => {
          drawCar(ctx, car)
          car.controller(dt, movement)
          car.update(dt)
        })
      }
      break
    case 1:
      drawTrack(ctx, track, true)
      break
    default:
      playerCar.backToRespawn()
      telemetry.stop()
  }
}

animate()
