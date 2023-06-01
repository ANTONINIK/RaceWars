import { Storage } from '../storage/Storage.js'
import { getVectorLength, rotateObject } from '../utils.js'
import { Track } from './Track.js'

const X_GRIP_FORCE: number = 0.9
const Y_GRIP_FORCE: number = 1.3
const THROTTLE: number = 225
const BRAKE: number = 130
const TURN_FORCE: number = 2.4
const FRICTION_FORCE: number = 1.3
const MAX_FRICTION: number = 50
const TURN_LIMITER: number = 10

export class Car implements IGameObject {
  private name: string
  private position: { x: number; y: number; angle: number }
  private velocity: { x: number; y: number }
  private tireTracks: { x: number; y: number; angle: number }[]
  private color: { body: string; roof: string; tireTracks: string }
  private width: number
  private height: number

  constructor() {
    this.name = Storage.getData('CAR_NAME')
    this.position = {
      x: +Storage.getData('SPAWN_CAR_POSITION_X'),
      y: +Storage.getData('SPAWN_CAR_POSITION_Y'),
      angle: +Storage.getData('SPAWN_CAR_POSITION_ANGLE')
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.tireTracks = []
    this.color = {
      body: Storage.getData('COLOR_CAR_BODY'),
      roof: Storage.getData('COLOR_CAR_ROOF'),
      tireTracks: Storage.getData('COLOR_CAR_TIRE_TRACKS')
    }
    this.width = 30
    this.height = 15
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.font = '16px Oswald'
    ctx.fillText(
      this.name,
      this.position.x - this.name.length * 4,
      this.position.y - 40
    )
    ctx.closePath()

    ctx.beginPath()
    ctx.save()
    ctx.fillStyle = this.color.body
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.position.angle)
    ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, [
      5
    ])
    ctx.fill()
    ctx.restore()
    ctx.closePath()

    ctx.beginPath()
    ctx.save()
    ctx.fillStyle = this.color.roof
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.position.angle)
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
  }

  update(): void {
    this.velocity.x *= -X_GRIP_FORCE * Storage.deltaTime + 1
    this.velocity.y *= -Y_GRIP_FORCE * Storage.deltaTime + 1
    const projection: { x: number; y: number } = rotateObject(
      this.velocity.x,
      this.velocity.y,
      this.position.angle
    )
    this.position.x += projection.x * Storage.deltaTime
    this.position.y += projection.y * Storage.deltaTime
  }

  turnLeft() {
    if (getVectorLength(this.velocity.x, this.velocity.y) > TURN_LIMITER) {
      this.position.angle -= TURN_FORCE * Storage.deltaTime
      if (this.velocity.x > MAX_FRICTION) {
        this.velocity.y -= this.velocity.x * FRICTION_FORCE * Storage.deltaTime
      }
    }
  }

  turnRight() {
    if (getVectorLength(this.velocity.x, this.velocity.y) > TURN_LIMITER) {
      this.position.angle += TURN_FORCE * Storage.deltaTime
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
    return false
  }

  toRespawn() {
    
  }
}
