function rotatedObject({ x, y }, angle) {
  return {
    x: Math.cos(angle) * x + Math.sin(angle) * y,
    y: Math.sin(angle) * x - Math.cos(angle) * y
  }
}
function vectorLength(vec) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
}

const telemetry = {
  lastLap: [],
  counterLaps: 0,
  htmlLaps: document.getElementById('laps'),
  htmlTimer: document.getElementById('timer'),
  htmlLastLap: document.getElementById('last-lap'),
  telemetryId: null,
  start(playerCar, trackCheckPoints, socket) {
    if (!this.telemetryId) {
      let passed = Array(trackCheckPoints.length).fill(false)
      let timer = 0
      this.telemetryId = setInterval(() => {
        timer += 0.01
        trackCheckPoints.forEach((checkPoint, index) => {
          if (
            Math.abs(checkPoint.x - playerCar.position.x) < 40 &&
            Math.abs(checkPoint.y - playerCar.position.y) < 40
          ) {
            if (index === 0 && passed[1] && passed[2]) {
              this.lastLap = timer
              this.counterLaps++
              this.update(socket, playerCar.name)
              timer = 0
              passed = Array(track.checkPoints.length).fill(false)
            } else {
              passed[index] = true
            }
          }
        })
        this.htmlTimer.textContent = `Timer: ${timer.toFixed(2)} s`
      }, 10)
    }
  },
  stop() {
    clearInterval(this.telemetryId)
    this.telemetryId = null
  },
  update(socket, carName) {
    this.htmlLastLap.textContent = `Last lap: ${this.lastLap.toFixed(2)} s`
    this.htmlLaps.textContent = `Laps: ${this.counterLaps}`
    socket.emit('new lap', { name: carName, time: this.lastLap.toFixed(3) })
  }
}
