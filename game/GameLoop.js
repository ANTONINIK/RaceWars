import { GameWorld } from '../models/GameWorld.js';
var GameLoop = (function () {
    function GameLoop() {
        this.gameWorld = new GameWorld();
        this.gameWorld.startRendering();
    }
    GameLoop.prototype.setGameMode = function (gameMode) {
        this.gameMode = gameMode;
    };
    GameLoop.prototype.executeGameMode = function () {
        this.gameMode.execute(this.gameWorld);
    };
    return GameLoop;
}());
export { GameLoop };
//# sourceMappingURL=GameLoop.js.map