import { rotateObject } from '../utils'

const X_GRIP_FORCE: number = 0.9
const Y_GRIP_FORCE: number = 1.3
const THROTTLE: number = 225
const BRAKE: number = 130
const TURN_FORCE: number = 2.4
const FRICTION_FORCE: number = 1.3
const MAX_FRICTION: number = 50
const TURN_LIMITER: number = 10

interface CarProps {
  name: string
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  rotationAngle: number
  tireTracks: { point: { x: number; y: number }; angle: number }[]
  color: string
}

export class Car implements IGameObject {
  private name: string
  private position: { x: number; y: number }
  private velocity: { x: number; y: number }
  private rotationAngle: number
  private tireTracks: { point: { x: number; y: number }; angle: number }[]
  private color: string
  private width: number
  private height: number

  constructor(props: CarProps) {
    this.name = props.name
    this.position = props.position
    this.velocity = props.velocity
    this.rotationAngle = props.rotationAngle
    this.tireTracks = props.tireTracks
    this.color = props.color
    this.width = 30
    this.height = 15
  }
  draw(ctx: CanvasRenderingContext2D): void {
    
  }
}
