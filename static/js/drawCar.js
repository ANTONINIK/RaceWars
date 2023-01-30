function drawCar(ctx, car) {
  drawTireTracks(ctx, car.width, car.height, car.tireTracks, car.color.track)

  ctx.beginPath()
  ctx.fillStyle = 'white'
  ctx.font = '16px Oswald'
  ctx.fillText(car.name, car.position.x - (car.name.length * 4), car.position.y - 40)
  ctx.closePath()

  ctx.beginPath()
  ctx.save()
  ctx.fillStyle = car.color.car
  ctx.translate(car.position.x, car.position.y)
  ctx.rotate(car.rotationAngle)
  ctx.roundRect(-car.width / 2, -car.height / 2, car.width, car.height, [5])
  ctx.fill()
  ctx.restore()
  ctx.closePath()

  ctx.beginPath()
  ctx.save()
  ctx.fillStyle = car.color.roof
  ctx.translate(car.position.x, car.position.y)
  ctx.rotate(car.rotationAngle)
  ctx.roundRect(-car.width / 2 + 3, -car.height / 2 +2, car.width/2, car.height - 4, [3])
  ctx.fill()
  ctx.restore()
  ctx.closePath()
}

function drawTireTracks(ctx, width, height, tireTracks, color) {
  tireTracks.forEach(coord => {
    const rightSide = rotatedObject(
      { x: width / 4, y: height / 2 - 2 },
      coord.angle
    )
    const leftSide = rotatedObject(
      { x: width / 4, y: -height / 2 + 2 },
      coord.angle
    )

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.arc(
      coord.point.x - leftSide.x,
      coord.point.y - leftSide.y,
      1,
      0,
      2 * Math.PI,
      false
    )
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.arc(
      coord.point.x - rightSide.x,
      coord.point.y - rightSide.y,
      1,
      0,
      2 * Math.PI,
      false
    )
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()
  })
}
