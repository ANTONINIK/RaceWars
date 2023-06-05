import { Background } from '../../models/Background.js'
import { GameWorld } from '../../models/GameWorld.js'
import { Track } from '../../models/Track.js'
import { IGameMode } from './IGameMode.js'

export class TrackEditor implements IGameMode {
  execute(gameWorld: GameWorld): void {
    gameWorld.remove()
    gameWorld.add(new Background())
    gameWorld.add(new Track(true))
  }
}
