import { InputHandler } from '../../input/InputHandler.js'
import { Background } from '../../models/Background.js'
import { GameWorld } from '../../models/GameWorld.js'
import { Track } from '../../models/Track.js'
import { IGameMode } from './IGameMode.js'

export class TrackEditor implements IGameMode {
  execute(gameWorld: GameWorld): void {
    const track: Track = new Track(true)

    gameWorld.remove()
    gameWorld.add(new Background())
    gameWorld.add(track)

    InputHandler.setTrack(track)
  }
}
