import drawCar from './js/drawCar.js'
import drawTrack from './js/drawTrack.js'
import movement from './js/move.js'
import { gameMode } from './js/menu.js'
import { playerCar, enemyCars, track } from './js/entities.js'

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

function animate() {
  window.requestAnimationFrame(animate)

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

      if (playerCar) {
        drawCar(ctx, playerCar)
      }

      //telemetry
      //telemetry.start(playerCar, track.checkPoints, socket)

      //enemy
      if (enemyCars) {
        for (const id in enemyCars) {
          if (playerCar.id !== id) {
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
      //telemetry.stop()
  }
}

animate()
