import { Car } from "../models/Car";

export interface ICommand {
  execute(car: Car): void
}
