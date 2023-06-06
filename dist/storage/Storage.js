import { Point } from '../models/Track.js';
import { Vector2 } from '../models/Vector2.js';
var Storage = (function () {
    function Storage() {
        Storage._data = JSON.parse(localStorage.getItem('data'));
        if (!Storage._data) {
            Storage._data = {};
            Storage._data['WIDTH'] = 512;
            Storage._data['HEIGHT'] = 288;
            Storage._data['DPI_HEIGHT'] = Storage._data['HEIGHT'] * 2;
            Storage._data['DPI_WIDTH'] = Storage._data['WIDTH'] * 2;
            Storage._data['CAR_NAME'] = 'Anton';
            Storage._data['COLOR_CAR_BODY'] = '#fa3d2f';
            Storage._data['COLOR_CAR_ROOF'] = '#4287ff';
            Storage._data['COLOR_CAR_TIRE_TRACKS'] = '#cccccc';
            Storage._data['SPAWN_CAR_POSITION'] = new Vector2(71.71, 197.4);
            Storage._data['SPAWN_CAR_POSITION_ANGLE'] = -1.722;
            Storage._data['TRACK_POINTS'] = [
                new Point(new Vector2(138, 70), true),
                new Point(new Vector2(149, 110), false),
                new Point(new Vector2(654, 39), true),
                new Point(new Vector2(777, 69), true),
                new Point(new Vector2(0, 0), false),
                new Point(new Vector2(981, 336), true),
                new Point(new Vector2(906, 390), true),
                new Point(new Vector2(0, 0), false),
                new Point(new Vector2(326, 454), true),
                new Point(new Vector2(191, 392), true),
                new Point(new Vector2(0, 0), false),
                new Point(new Vector2(33, 70), true),
            ];
            Storage._data['BEST_LAPS'] = [];
        }
    }
    Object.defineProperty(Storage, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Storage, "deltaTime", {
        get: function () {
            return this._deltaTime;
        },
        set: function (deltaTime) {
            this._deltaTime = deltaTime;
        },
        enumerable: false,
        configurable: true
    });
    Storage.save = function () {
        localStorage.setItem('data', JSON.stringify(this._data));
    };
    Storage.setData = function (key, value) {
        this._data[key] = value;
    };
    Storage.getData = function (key) {
        return this._data[key];
    };
    return Storage;
}());
export { Storage };
window.onunload = function () {
    Storage.save();
};
var StorageInstance = Storage.instance;
//# sourceMappingURL=Storage.js.map