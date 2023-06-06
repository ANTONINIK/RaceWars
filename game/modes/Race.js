import { InputHandler } from '../../input/InputHandler.js';
import { Background } from '../../models/Background.js';
import { Car } from '../../models/Car.js';
import { Telemetry } from '../../models/Telemetry.js';
import { Track } from '../../models/Track.js';
var Race = (function () {
    function Race() {
    }
    Race.prototype.execute = function (gameWorld) {
        gameWorld.remove();
        var car = new Car();
        var track = new Track(false);
        gameWorld.add(new Background());
        gameWorld.add(track);
        gameWorld.add(new Telemetry(car, track));
        gameWorld.add(car);
        InputHandler.initKeyboardActions(car);
    };
    return Race;
}());
export { Race };
//# sourceMappingURL=Race.js.map