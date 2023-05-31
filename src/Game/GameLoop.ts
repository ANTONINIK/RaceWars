import { GameWorld } from '../models/GameWorld.js'
import { IGameMode } from './modes/IGameMode.js'

export class GameLoop {
  private gameMode: IGameMode
  private gameWorld: GameWorld

  constructor() {
    this.gameWorld = new GameWorld()
    this.gameWorld.startRendering()
  }

  setGameMode(gameMode: IGameMode) {
    this.gameMode = gameMode
  }

  executeGameMode() {
    this.gameMode.execute(this.gameWorld)
  }
}
