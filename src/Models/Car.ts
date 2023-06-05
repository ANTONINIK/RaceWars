import { Storage } from '../storage/Storage.js'
import { getVectorLength, rotateObject } from '../utils.js'
import { Track } from './Track.js'
import { Vector2 } from './Vector2.js'

const X_GRIP_FORCE = 0.9
const Y_GRIP_FORCE = 1.3
const THROTTLE = 225
const BRAKE = 130
const TURN_FORCE = 2.4
const FRICTION_FORCE = 1.3
const MAX_FRICTION = 50
const TURN_LIMITER = 10

export class Car implements IGameObject {
  private name: string
  private position: { coordinate: Vector2; turningAngle: number }
  private velocity: Vector2
  private tireTracks: { coordinate: Vector2; turningAngle: number }[]
  private color: { body: string; roof: string; tireTracks: string }
  private width: number
  private height: number

  constructor() {
    this.name = Storage.getData('CAR_NAME')
    this.position = {
      coordinate: Storage.getData('SPAWN_CAR_POSITION'),
      turningAngle: Storage.getData('SPAWN_CAR_POSITION_ANGLE'),
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.tireTracks = []
    this.color = {
      body: Storage.getData('COLOR_CAR_BODY'),
      roof: Storage.getData('COLOR_CAR_ROOF'),
      tireTracks: Storage.getData('COLOR_CAR_TIRE_TRACKS'),
    }
    this.width = 30
    this.height = 15
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Надпись
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.font = '16px Oswald'
    ctx.fillText(
      this.name,
      this.position.coordinate.x - this.name.length * 4,
      this.position.coordinate.y - 40
    )
    ctx.closePath()

    // Корпус
    ctx.beginPath()
    ctx.save()
    ctx.fillStyle = this.color.body
    ctx.translate(this.position.coordinate.x, this.position.coordinate.y)
    ctx.rotate(this.position.turningAngle)
    ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, [
      5,
    ])
    ctx.fill()
    ctx.restore()
    ctx.closePath()

    // Крыша
    ctx.beginPath()
    ctx.save()
    ctx.fillStyle = this.color.roof
    ctx.translate(this.position.coordinate.x, this.position.coordinate.y)
    ctx.rotate(this.position.turningAngle)
    ctx.roundRect(
      -this.width / 2 + 3,
      -this.height / 2 + 2,
      this.width / 2,
      this.height - 4,
      [3]
    )
    ctx.fill()
    ctx.restore()
    ctx.closePath()

    // Следы
    this.tireTracks.forEach(tireTrack => {
      const rightSide = rotateObject(
        new Vector2(this.width / 4, this.height / 2 - 2),
        tireTrack.turningAngle
      )
      const leftSide = rotateObject(
        new Vector2(this.width / 4, -this.height / 2 + 2),
        tireTrack.turningAngle
      )

      ctx.beginPath()
      ctx.strokeStyle = this.color.tireTracks
      ctx.arc(
        tireTrack.coordinate.x - leftSide.x,
        tireTrack.coordinate.y - leftSide.y,
        1,
        0,
        2 * Math.PI,
        false
      )
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.closePath()

      ctx.beginPath()
      ctx.strokeStyle = this.color.tireTracks
      ctx.arc(
        tireTrack.coordinate.x - rightSide.x,
        tireTrack.coordinate.y - rightSide.y,
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

  saveTireTracks() {
    if (Math.abs(this.velocity.y) > 120) {
      this.tireTracks.push(JSON.parse(JSON.stringify(this.position)))
      if (this.tireTracks.length > 200) {
        this.tireTracks.shift()
      }
    }
  }

  update(): void {
    this.velocity.x *= -X_GRIP_FORCE * Storage.deltaTime + 1
    this.velocity.y *= -Y_GRIP_FORCE * Storage.deltaTime + 1
    const projection: Vector2 = rotateObject(
      this.velocity,
      this.position.turningAngle
    )
    this.position.coordinate.x += projection.x * Storage.deltaTime
    this.position.coordinate.y += projection.y * Storage.deltaTime
    this.saveTireTracks()
  }

  turnLeft() {
    if (getVectorLength(this.velocity) > TURN_LIMITER) {
      this.position.turningAngle -= TURN_FORCE * Storage.deltaTime
      if (this.velocity.x > MAX_FRICTION) {
        this.velocity.y -= this.velocity.x * FRICTION_FORCE * Storage.deltaTime
      }
    }
  }

  turnRight() {
    if (getVectorLength(this.velocity) > TURN_LIMITER) {
      this.position.turningAngle += TURN_FORCE * Storage.deltaTime
      if (this.velocity.x > MAX_FRICTION) {
        this.velocity.y += this.velocity.x * FRICTION_FORCE * Storage.deltaTime
      }
    }
  }

  brake() {
    this.velocity.x -= Storage.deltaTime * BRAKE
  }

  acceleration() {
    this.velocity.x += Storage.deltaTime * THROTTLE
  }

  isCollidingWithRacingTrack(track: Track): boolean {
    for (let i = 0; i < track.getFirstLine().length; i++) {
      if (
        (Math.abs(track.getFirstLine()[i].x - this.position.coordinate.x) < 3 &&
          Math.abs(track.getFirstLine()[i].y - this.position.coordinate.y) <
            3) ||
        (Math.abs(track.getSecondLine()[i].x - this.position.coordinate.x) <
          3 &&
          Math.abs(track.getSecondLine()[i].y - this.position.coordinate.y) < 3)
      ) {
        return true
      }
    }
    return false
  }

  toRespawn() {
    this.position = {
      coordinate: Storage.getData('SPAWN_CAR_POSITION'),
      turningAngle: Storage.getData('SPAWN_CAR_POSITION_ANGLE'),
    }
  }
}
