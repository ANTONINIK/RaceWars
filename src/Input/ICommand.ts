import { Car } from '../models/Car'

export type ICommand = {
  execute(car: Car): void
}
