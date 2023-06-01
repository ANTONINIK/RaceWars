import { GameWorld } from '../../models/GameWorld.js'

export type IGameMode = {
  execute(gameworld: GameWorld): void
}
