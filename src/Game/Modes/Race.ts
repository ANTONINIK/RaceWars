import { Car } from '../../models/Car.js'
import { Track } from '../../models/Track.js'
import { GameWorld } from '../../models/GameWorld.js'
import { IGameMode } from './IGameMode.js'
import { Background } from '../../models/BackGround.js'

export class Race implements IGameMode {
  execute(gameworld: GameWorld): void {
    gameworld.remove()
    gameworld.add(new Background())
    gameworld.add(new Track())
    gameworld.add(new Car())
  }
}
