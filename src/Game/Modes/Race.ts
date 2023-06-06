import { InputHandler } from '../../input/InputHandler.js'
import { Background } from '../../models/Background.js'
import { Car } from '../../models/Car.js'
import { GameWorld } from '../../models/GameWorld.js'
import { Telemetry } from '../../models/Telemetry.js'
import { Track } from '../../models/Track.js'
import { IGameMode } from './IGameMode.js'

export class Race implements IGameMode {
  execute(gameWorld: GameWorld): void {
    gameWorld.remove()

    const car: Car = new Car();
    gameWorld.add(new Background())
    gameWorld.add(new Track(false))
    gameWorld.add(new Telemetry())
    gameWorld.add(car)
    InputHandler.initKeyboardActions(car)
  }
}
