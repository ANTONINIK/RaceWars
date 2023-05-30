import { rotatedObject, vectorLength } from '../utils.js'

const X_GRIP_FORCE = 0.9
const Y_GRIP_FORCE = 1.3
const THROTTLE = 225
const BRAKE = 130
const TURN_FORCE = 2.4
const FRICTION_FORCE = 1.3
const MAX_FRICTION = 50
const TURN_LIMITER = 10

export default class Car {
  constructor(props) {
    this.id = props.id
    this.name = props.name
    this.position = props.position
    this.velocity = props.velocity
    this.rotationAngle = props.rotationAngle
    this.tireTracks = props.tireTracks
    this.color = props.color
    this.width = 30
    this.height = 15
    this.respawn = null
  }

  saveTireTracks() {
    if (Math.abs(this.velocity.y) > 120) {
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

  setData(data) {
    this.id = data.id
    this.name = data.name
    this.position = data.position
    this.velocity = data.velocity
    this.rotationAngle = data.rotationAngle
    this.tireTracks = data.tireTracks
    this.color = data.color
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      position: this.position,
      velocity: this.velocity,
      rotationAngle: this.rotationAngle,
      tireTracks: this.tireTracks,
      color: this.color
    }
  }

  setNewRespawn(newResp) {
    this.respawn = newResp
    this.position.x = newResp.point.x
    this.position.y = newResp.point.y
    this.rotationAngle = newResp.rotationAngle
  }

  backToRespawn() {
    if (this.respawn) {
      this.position.x = this.respawn.point.x
      this.position.y = this.respawn.point.y
      this.rotationAngle = this.respawn.rotationAngle
      this.velocity.x = 0
      this.velocity.y = 0
    }
  }

  update(dt) {
    this.velocity.x *= -X_GRIP_FORCE * dt + 1
    this.velocity.y *= -Y_GRIP_FORCE * dt + 1
    const projection = rotatedObject(this.velocity, this.rotationAngle)
    this.position.x += projection.x * dt
    this.position.y += projection.y * dt
    this.saveTireTracks()
  }

  controller(dt, movement) {
    if (movement.left && vectorLength(this.velocity) > TURN_LIMITER) {
      this.rotationAngle -= TURN_FORCE * dt
      if (this.velocity.x > MAX_FRICTION) {
        this.velocity.y -= this.velocity.x * FRICTION_FORCE * dt
      }
    }
    if (movement.right && vectorLength(this.velocity) > TURN_LIMITER) {
      this.rotationAngle += TURN_FORCE * dt
      if (this.velocity.x > MAX_FRICTION) {
        this.velocity.y += this.velocity.x * FRICTION_FORCE * dt
      }
    }
    if (movement.down) {
      this.velocity.x -= dt * BRAKE
    }
    if (movement.up) {
      this.velocity.x += dt * THROTTLE
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
        this.backToRespawn()
      }
    }
  }
}
