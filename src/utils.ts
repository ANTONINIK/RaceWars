import { Vector2 } from './models/Vector2.js'

export function rotateObject(point: Vector2, turningAngle: number): Vector2 {
  return new Vector2(
    Math.cos(turningAngle) * point.x + Math.sin(turningAngle) * point.y,
    Math.sin(turningAngle) * point.x - Math.cos(turningAngle) * point.y
  )
}

export function getVectorLength(point: Vector2): number {
  return Math.sqrt(point.x * point.x + point.y * point.y)
}
