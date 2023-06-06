import { InputHandler } from '../../input/InputHandler.js';
import { Background } from '../../models/Background.js';
import { Track } from '../../models/Track.js';
var TrackEditor = (function () {
    function TrackEditor() {
    }
    TrackEditor.prototype.execute = function (gameWorld) {
        gameWorld.remove();
        var track = new Track(true);
        gameWorld.add(new Background());
        gameWorld.add(track);
        InputHandler.initMouseActions(track);
    };
    return TrackEditor;
}());
export { TrackEditor };
//# sourceMappingURL=TrackEditor.js.map