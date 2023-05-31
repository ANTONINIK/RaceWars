import { Car } from "../models/Car";

interface ICommand {
  execute(car: Car): void
}
