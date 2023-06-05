import { Car } from '../models/Car.js'
import { ICommand } from './ICommand.js'

export class TurnLeftCommand implements ICommand {
  execute(car: Car) {
    car.turnLeft()
  }
}

export class TurnRightCommand implements ICommand {
  execute(car: Car) {
    car.turnRight()
  }
}
export class BrakeCommand implements ICommand {
  execute(car: Car) {
    car.brake()
  }
}
export class AccelerationCommand implements ICommand {
  execute(car: Car) {
    car.acceleration()
  }
}
