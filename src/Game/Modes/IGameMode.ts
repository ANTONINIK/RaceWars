import { GameWorld } from "../../models/GameWorld.js";

export interface IGameMode {
  execute(gameworld: GameWorld): void
}
