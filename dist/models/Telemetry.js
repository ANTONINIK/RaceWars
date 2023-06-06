import { Storage } from '../storage/Storage.js';
var Telemetry = (function () {
    function Telemetry(car, track) {
        this.lastLapTime = 0;
        this.counterLaps = 0;
        this.timer = 0;
        this.passedPoints = [];
        this.htmlLaps = document.getElementById('laps');
        this.htmlTimer = document.getElementById('timer');
        this.htmlLastLap = document.getElementById('last-lap');
        this.car = car;
        this.track = track;
        this.display();
    }
    Telemetry.prototype.update = function () {
        var _this = this;
        this.timer += Storage.deltaTime;
        this.track.getCheckPoints().forEach(function (checkPoint, index) {
            if (Math.abs(checkPoint.x - _this.car.getPosition().coordinate.x) < 40 &&
                Math.abs(checkPoint.y - _this.car.getPosition().coordinate.y) < 40) {
                if (index === 0) {
                    if (_this.passedPoints[0] &&
                        _this.passedPoints[1] &&
                        _this.passedPoints[2]) {
                        _this.lastLapTime = _this.timer;
                        _this.counterLaps++;
                        _this.newLap();
                    }
                    _this.reset();
                }
                _this.passedPoints[index] = true;
            }
        });
        if (this.htmlTimer) {
            this.htmlTimer.textContent = "Timer: ".concat(this.timer.toFixed(2), " s");
        }
    };
    Telemetry.prototype.newLap = function () {
        if (this.htmlLastLap) {
            this.htmlLastLap.textContent = "Last lap: ".concat(this.lastLapTime.toFixed(2), " s");
        }
        if (this.htmlLaps) {
            this.htmlLaps.textContent = "Laps: ".concat(this.counterLaps);
        }
        var bestlaps = Storage.getData('BEST_LAPS');
        bestlaps.push({
            name: Storage.getData('CAR_NAME'),
            lapTime: this.lastLapTime
        });
        Storage.setData('BEST_LAPS', bestlaps);
    };
    Telemetry.prototype.display = function () {
        var gameInfo = document.getElementById('game-info');
        if (gameInfo) {
            gameInfo.classList.toggle('hidden');
        }
    };
    Telemetry.prototype.reset = function () {
        this.passedPoints = Array(3).fill(false);
        if (this.timer > 1) {
            this.timer = 0;
        }
    };
    Telemetry.prototype.draw = function () { };
    return Telemetry;
}());
export { Telemetry };
//# sourceMappingURL=Telemetry.js.map