export default function drawTrack(ctx, track, editorMode) {
  track.editorMode = editorMode
  drawCurve(ctx, track.trackLine1)
  drawCurve(ctx, track.trackLine2)
  drawFinish(ctx, track.trackLine1, track.trackLine2)
  if (editorMode) {
    drawPoints(ctx, track.points)
    drawTripleLines(ctx, track.points)
  }
}

function drawPoints(ctx, points) {
  points.forEach(point => {
    ctx.beginPath()
    ctx.arc(point.x, point.y, 7, 0, 2 * Math.PI, false)
    if (point.changed) ctx.strokeStyle = 'rgb(0, 182, 255)'
    else ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  })
}

function drawCurve(ctx, coords) {
  ctx.beginPath()
  ctx.moveTo(coords[0].x, coords[0].y)
  coords.forEach(point => {
    ctx.lineTo(point.x, point.y)
  })
  ctx.lineTo(coords[0].x, coords[0].y)
  ctx.lineWidth = 3
  ctx.strokeStyle = 'grey'
  ctx.stroke()
  ctx.closePath()
}

function drawTripleLines(ctx, points) {
  ctx.beginPath()
  for (let i = 2; i < points.length - 2; i += 3) {
    ctx.moveTo(points[i].x, points[i].y)
    ctx.lineTo(points[i + 2].x, points[i + 2].y)
  }
  ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y)
  ctx.lineTo(points[1].x, points[1].y)
  ctx.lineWidth = 1
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.closePath()
}

function drawFinish(ctx, trackLine1, trackLine2) {
  ctx.beginPath()
  ctx.moveTo(trackLine1[0].x, trackLine1[0].y)
  ctx.lineTo(trackLine2[0].x, trackLine2[0].y)
  ctx.lineWidth = 10
  ctx.strokeStyle = 'red'
  ctx.stroke()
  ctx.closePath()
}

function drawCheckPoints(ctx, checkPoints) {
  checkPoints.forEach(checkPoint => {
    ctx.beginPath()
    ctx.arc(checkPoint.x, checkPoint.y, 40, 0, 2 * Math.PI, false)
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  })
}
