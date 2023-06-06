import { Car } from '../models/Car.js'

export abstract class CarCommand {
  receiver: Car
  abstract execute(): void
  constructor(car: Car) {
    this.receiver = car
  }
}

export class TurnLeftCommand extends CarCommand {
  constructor(car: Car) {
    super(car)
  }
  execute() {
    this.receiver.turnLeft()
  }
}

export class TurnRightCommand extends CarCommand {
  constructor(car: Car) {
    super(car)
  }
  execute() {
    this.receiver.turnRight()
  }
}
export class BrakeCommand extends CarCommand {
  constructor(car: Car) {
    super(car)
  }
  execute() {
    this.receiver.brake()
  }
}
export class AccelerationCommand extends CarCommand {
  constructor(car: Car) {
    super(car)
  }
  execute() {
    this.receiver.acceleration()
  }
}
