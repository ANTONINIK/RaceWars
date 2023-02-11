export default class Track {
  constructor(canvas) {
    this.points = null
    this.coords
    this.trackLine1
    this.trackLine2
    this.movingPointIndex = -1
    this.capturedPoint = false
    this.trackWidth = 40
    this.editorMode = false
    this.checkPoints = [null, null, null]
    this.carRespawn = {}
  }

  update() {
    this.updatePoints()
    this.coords = this.computeBezierCurve(this.points)
    this.updateCheckPoints()
    this.updateCarRespawn()
    this.trackLine1 = this.computeTrackLine(this.coords, this.trackWidth)
    this.trackLine2 = this.computeTrackLine(this.coords, -this.trackWidth)
  }

  updatePoints() {
    this.points[1].x = 2 * this.points[0].x - this.points[11].x
    this.points[1].y = 2 * this.points[0].y - this.points[11].y
    this.points[4].x = 2 * this.points[3].x - this.points[2].x
    this.points[4].y = 2 * this.points[3].y - this.points[2].y
    this.points[7].x = 2 * this.points[6].x - this.points[5].x
    this.points[7].y = 2 * this.points[6].y - this.points[5].y
    this.points[10].x = 2 * this.points[9].x - this.points[8].x
    this.points[10].y = 2 * this.points[9].y - this.points[8].y
  }

  updateCheckPoints() {
    this.checkPoints[0] = this.coords[7]
    this.checkPoints[1] = this.coords[Math.floor(this.coords.length / 4)]
    this.checkPoints[2] = this.coords[Math.floor(this.coords.length / 1.5)]
  }

  updateCarRespawn() {
    const offset = 50
    const point1 = this.coords[this.coords.length - offset]
    const point2 = this.coords[this.coords.length - offset + 1]
    if (point1 && point2) {
      this.carRespawn.point = point2
      this.carRespawn.rotationAngle = Math.atan2(
        point2.y - point1.y,
        point2.x - point1.x
      )
    }
  }

  subscribeToEvents(canvas) {
    canvas.addEventListener('mousedown', this.mouseDown.bind(this))
    canvas.addEventListener('mousemove', this.mouseMove.bind(this))
    canvas.addEventListener('mouseup', this.mouseUp.bind(this))
  }

  computeTrackLine(coords, ratio) {
    const line = []
    const n = {
      x: 0,
      y: 0
    }
    for (let i = 0; i < coords.length; i++) {
      n.x = -coords[(i + 1) % coords.length].y + coords[i].y
      n.y = coords[(i + 1) % coords.length].x - coords[i].x
      const mag = Math.sqrt(n.x * n.x + n.y * n.y)
      n.x = n.x / mag
      n.y = n.y / mag
      line.push({
        x: coords[i].x + n.x * ratio,
        y: coords[i].y + n.y * ratio
      })
    }
    return line
  }

  computeBezierCurve(points, step = 0.01) {
    const coords = []
    for (let i = 0; i < points.length; i += 3) {
      for (let t = 0; t <= 1; t += step) {
        coords.push({
          x:
            Math.pow(1 - t, 3) * points[i]['x'] +
            3 * t * Math.pow(1 - t, 2) * points[i + 1]['x'] +
            3 * Math.pow(t, 2) * (1 - t) * points[i + 2]['x'] +
            Math.pow(t, 3) * points[(i + 3) % points.length]['x'],
          y:
            Math.pow(1 - t, 3) * points[i]['y'] +
            3 * t * Math.pow(1 - t, 2) * points[i + 1]['y'] +
            3 * Math.pow(t, 2) * (1 - t) * points[i + 2]['y'] +
            Math.pow(t, 3) * points[(i + 3) % points.length]['y']
        })
      }
    }
    return coords
  }

  mouseDown(event) {
    const x = event.offsetX
    const y = event.offsetY
    this.movingPointIndex = this.points.findIndex(point => {
      return Math.abs(point.x - x) <= 7 && Math.abs(point.y - y) <= 7
    })

    if (this.points[this.movingPointIndex] && this.editorMode) {
      this.capturedPoint = true
    }
  }
  mouseMove(event) {
    if (this.capturedPoint) {
      this.points[this.movingPointIndex].x = event.offsetX
      this.points[this.movingPointIndex].y = event.offsetY
      if (this.movingPointIndex % 3 === 0) {
        if (this.movingPointIndex === 0) {
          this.points[this.points.length - 1].x +=
            event.offsetX - this.points[this.movingPointIndex].x
          this.points[this.points.length - 1].y +=
            event.offsetY - this.points[this.movingPointIndex].y
        } else {
          this.points[this.movingPointIndex - 1].x +=
            event.offsetX - this.points[this.movingPointIndex].x
          this.points[this.movingPointIndex - 1].y +=
            event.offsetY - this.points[this.movingPointIndex].y
        }
      }
      this.update()
    }
  }

  mouseUp(event) {
    this.capturedPoint = false
  }
}
