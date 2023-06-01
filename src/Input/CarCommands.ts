import { Car } from '../models/Car'
import { ICommand } from './ICommand'

class TurnLeftCommand implements ICommand {
  execute(car: Car) {
    car.turnLeft()
  }
}

class TurnRightCommand implements ICommand {
  execute(car: Car) {
    car.turnRight()
  }
}
class BrakeCommand implements ICommand {
  execute(car: Car) {
    car.brake()
  }
}
class AccelerationCommand implements ICommand {
  execute(car: Car) {
    car.acceleration()
  }
}