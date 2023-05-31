import { Car } from '../../models/Car'
import { GameWorld } from '../../models/GameWorld'
import { Track } from '../../models/Track'

export class Race implements IGameMode {
  execute(): void {
    const gw: GameWorld = new GameWorld()
    //gw.add(new Car())
    gw.add(new Track())
  }
}
