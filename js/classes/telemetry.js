import { updateBestLap } from '../entities.js'

export default class Telemetry {
  constructor() {
    this.lastLap = 0
    this.counterLaps = 0
    this.telemetryId = null
    this.timer = 0
    this.passedPoints = null
    this.htmlLaps = document.getElementById('laps')
    this.htmlTimer = document.getElementById('timer')
    this.htmlLastLap = document.getElementById('last-lap')
  }
  start(playerCar, track) {
    if (!this.telemetryId) {
      this.display()
      this.reset()
      this.telemetryId = setInterval(() => {
        this.timer += 0.01
        track.checkPoints.forEach((checkPoint, index) => {
          if (
            Math.abs(checkPoint.x - playerCar.position.x) < 40 &&
            Math.abs(checkPoint.y - playerCar.position.y) < 40
          ) {
            if (index === 0) {
              if (
                this.passedPoints[0] &&
                this.passedPoints[1] &&
                this.passedPoints[2]
              ) {
                this.lastLap = this.timer
                this.counterLaps++
                this.update(playerCar.name)
              }
              this.reset()
            }
            this.passedPoints[index] = true
          }
        })
        this.htmlTimer.textContent = `Timer: ${this.timer.toFixed(2)} s`
      }, 10)
    }
  }
  stop() {
    clearInterval(this.telemetryId)
    if (this.telemetryId !== null) {
      this.display()
      this.telemetryId = null
    }
  }
  update(name) {
    this.htmlLastLap.textContent = `Last lap: ${this.lastLap.toFixed(2)} s`
    this.htmlLaps.textContent = `Laps: ${this.counterLaps}`
    updateBestLap(name, this.lastLap)
  }
  display() {
    const gameInfo = document.getElementById('game-info')
    gameInfo.classList.toggle('hidden')
  }
  reset() {
    this.passedPoints = Array(3).fill(false)
    if (this.timer > 1) this.timer = 0
  }
}
