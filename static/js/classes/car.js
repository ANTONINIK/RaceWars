import { rotatedObject, vectorLength } from '../utils.js'

// const X_GRIP_FORCE = 0.95
// const Y_GRIP_FORCE = 0.94
// const TURN_FORCE = 0.04
// const FRICTION_FORCE = 0.045
// const BRAKING = 0.1
// const ACCELERATION = 0.21
// const MAX_FRICTION = 0
// const TURN_LIMITER = 0.2

const GRIP_FORCE = 1
const TURN_FORCE = 2
const FRICTION_FORCE = 0.5
const BRAKING = 150
const ACCELERATION = 150
const MAX_FRICTION = 300
const TURN_LIMITER = 5

// const X_GRIP_FORCE = 0.95
// const Y_GRIP_FORCE = 0.97
// const TURN_FORCE = 0.08
// const FRICTION_FORCE = 0.045
// const BRAKING = 0.3
// const ACCELERATION = 0.6
// const MAX_FRICTION = 0
// const TURN_LIMITER = 0.5

export default class Car {
  constructor(props) {
    this.id = props.id
    this.name = props.name
    this.position = props.position
    this.velocity = props.velocity
    this.acceleration = props.acceleration
    this.rotationAngle = props.rotationAngle
    this.tireTracks = props.tireTracks
    this.color = props.color
    this.width = 30
    this.height = 15
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

  setData(data) {
    this.id = data.id
    this.name = data.name
    this.position = data.position
    this.velocity = data.velocity
    this.acceleration = data.acceleration
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
      acceleration: this.acceleration,
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
      this.acceleration.x = 0
      this.acceleration.y = 0
    }
  }

  update(dt) {
    const speed = rotatedObject(this.acceleration, this.rotationAngle)
    this.velocity.x += speed.x * dt
    this.velocity.y += speed.y * dt
    this.position.x += this.velocity.x * dt
    this.position.y += this.velocity.y * dt
    this.velocity.x *= -GRIP_FORCE * dt + 1
    this.velocity.y *= -GRIP_FORCE * dt + 1
    this.saveTireTracks()
  }

  controller(dt, movement) {
    if (movement.left && vectorLength(this.velocity) > TURN_LIMITER) {
      this.rotationAngle -= TURN_FORCE * dt
      if (this.acceleration.x > MAX_FRICTION) {
        if (this.acceleration.y > -150)
          this.acceleration.y -= this.acceleration.x * FRICTION_FORCE * dt
      } else {
        this.acceleration.y = 0
      }
    }
    if (movement.right && vectorLength(this.velocity) > TURN_LIMITER) {
      this.rotationAngle += TURN_FORCE * dt
      if (this.acceleration.x > MAX_FRICTION) {
        if (this.acceleration.y < 150)
          this.acceleration.y += this.acceleration.x * FRICTION_FORCE * dt
      } else {
        this.acceleration.y = 0
      }
    }
    if (movement.down) {
      if (this.acceleration.x > -200) this.acceleration.x -= dt * BRAKING
    }
    if (movement.up) {
      if (this.acceleration.x < 200) this.acceleration.x += dt * ACCELERATION
    }
    if (movement.down === false && movement.up === false)
      this.acceleration.x = 0
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
