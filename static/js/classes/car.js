import { rotatedObject, vectorLength } from '../utils.js'

const X_GRIP_FORCE = 0.95
const Y_GRIP_FORCE = 0.94
const TURN_FORCE = 0.04
const FRICTION_FORCE = 0.045
const BRAKING = 0.1
const ACCELERATION = 0.2
const MAX_FRICTION = 0
const TURN_LIMITER = 0.2

export default class Car {
  constructor(props) {
    this.name = props.name
    this.id = props.id
    this.position = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 15
    this.velocity = {
      x: 0,
      y: 0
    }
    this.acceleration = {
      x: 0,
      y: 0
    }
    this.rotationAngle = 0
    this.tireTracks = []
    this.color = {
      car: '#FFA500',
      roof: '#FF0000',
      track: '#808080'
    }
    this.respawn = null
  }

  saveTireTracks() {
    if (Math.abs(this.acceleration.y) > 2) {
      this.tireTracks.push(
        JSON.parse(
          JSON.stringify({ point: this.position, angle: this.rotationAngle })
        )
      )
      if (this.tireTracks.length > 200) {
        this.tireTracks.shift()
      }
    }
  }

  setRespawn(newResp) {
    this.respawn = newResp
    this.position.x = newResp.point.x
    this.position.y = newResp.point.y
    this.rotationAngle = newResp.rotationAngle
  }

  update() {
    const speed = rotatedObject(this.acceleration, this.rotationAngle)
    this.velocity.x = speed.x
    this.velocity.y = speed.y
    this.acceleration.x *= X_GRIP_FORCE
    this.acceleration.y *= Y_GRIP_FORCE
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.saveTireTracks()
  }

  controller(movement) {
    if (movement.left && vectorLength(this.velocity) > TURN_LIMITER) {
      this.rotationAngle -= TURN_FORCE
      if (this.acceleration.x > MAX_FRICTION) {
        this.acceleration.y -= this.acceleration.x * FRICTION_FORCE
      }
    }
    if (movement.right && vectorLength(this.velocity) > TURN_LIMITER) {
      this.rotationAngle += TURN_FORCE
      if (this.acceleration.x > MAX_FRICTION) {
        this.acceleration.y += this.acceleration.x * FRICTION_FORCE
      }
    }
    if (movement.down) {
      this.acceleration.x -= BRAKING
    }
    if (movement.up) {
      this.acceleration.x += ACCELERATION
    }
  }

  collision(track) {
    for (let i = 0; i < track.trackLine1.length; i++) {
      if (
        (Math.abs(track.trackLine1[i].x - this.position.x) < 3 &&
          Math.abs(track.trackLine1[i].y - this.position.y) < 3) ||
        (Math.abs(track.trackLine2[i].x - this.position.x) < 3 &&
          Math.abs(track.trackLine2[i].y - this.position.y) < 3)
      ) {
        this.position.x = this.respawn.point.x
        this.position.y = this.respawn.point.y
        this.rotationAngle = this.respawn.rotationAngle
        this.acceleration.x = 0
        this.acceleration.y = 0
      }
    }
  }
}
