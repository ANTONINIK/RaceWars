import { Storage } from '../storage/Storage.js';
import { getVectorLength, rotateObject } from '../utils.js';
import { Vector2 } from './Vector2.js';
var X_GRIP_FORCE = 0.9;
var Y_GRIP_FORCE = 1.3;
var THROTTLE = 225;
var BRAKE = 130;
var TURN_FORCE = 2.4;
var FRICTION_FORCE = 1.3;
var MAX_FRICTION = 50;
var TURN_LIMITER = 10;
var Car = (function () {
    function Car() {
        this.name = Storage.getData('CAR_NAME');
        this.position = {
            coordinate: Storage.getData('SPAWN_CAR_POSITION'),
            turningAngle: Storage.getData('SPAWN_CAR_POSITION_ANGLE'),
        };
        this.velocity = new Vector2(0, 0);
        this.tireTracks = [];
        this.color = {
            body: Storage.getData('COLOR_CAR_BODY'),
            roof: Storage.getData('COLOR_CAR_ROOF'),
            tireTracks: Storage.getData('COLOR_CAR_TIRE_TRACKS'),
        };
        this.width = 30;
        this.height = 15;
    }
    Car.prototype.getPosition = function () {
        return this.position;
    };
    Car.prototype.draw = function (ctx) {
        var _this = this;
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = '16px Oswald';
        ctx.fillText(this.name, this.position.coordinate.x - this.name.length * 4, this.position.coordinate.y - 40);
        ctx.closePath();
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = this.color.body;
        ctx.translate(this.position.coordinate.x, this.position.coordinate.y);
        ctx.rotate(this.position.turningAngle);
        ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, [
            5,
        ]);
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = this.color.roof;
        ctx.translate(this.position.coordinate.x, this.position.coordinate.y);
        ctx.rotate(this.position.turningAngle);
        ctx.roundRect(-this.width / 2 + 3, -this.height / 2 + 2, this.width / 2, this.height - 4, [3]);
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        this.tireTracks.forEach(function (tireTrack) {
            var rightSide = rotateObject(new Vector2(_this.width / 4, _this.height / 2 - 2), tireTrack.turningAngle);
            var leftSide = rotateObject(new Vector2(_this.width / 4, -_this.height / 2 + 2), tireTrack.turningAngle);
            ctx.beginPath();
            ctx.strokeStyle = _this.color.tireTracks;
            ctx.arc(tireTrack.coordinate.x - leftSide.x, tireTrack.coordinate.y - leftSide.y, 1, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = _this.color.tireTracks;
            ctx.arc(tireTrack.coordinate.x - rightSide.x, tireTrack.coordinate.y - rightSide.y, 1, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        });
    };
    Car.prototype.saveTireTracks = function () {
        if (Math.abs(this.velocity.y) > 120) {
            this.tireTracks.push(JSON.parse(JSON.stringify(this.position)));
            if (this.tireTracks.length > 200) {
                this.tireTracks.shift();
            }
        }
    };
    Car.prototype.update = function () {
        console.log(this.position);
        this.velocity.x *= -X_GRIP_FORCE * Storage.deltaTime + 1;
        this.velocity.y *= -Y_GRIP_FORCE * Storage.deltaTime + 1;
        var projection = rotateObject(this.velocity, this.position.turningAngle);
        this.position.coordinate.x += projection.x * Storage.deltaTime;
        this.position.coordinate.y += projection.y * Storage.deltaTime;
        this.saveTireTracks();
    };
    Car.prototype.turnLeft = function () {
        if (getVectorLength(this.velocity) > TURN_LIMITER) {
            this.position.turningAngle -= TURN_FORCE * Storage.deltaTime;
            if (this.velocity.x > MAX_FRICTION) {
                this.velocity.y -= this.velocity.x * FRICTION_FORCE * Storage.deltaTime;
            }
        }
    };
    Car.prototype.turnRight = function () {
        if (getVectorLength(this.velocity) > TURN_LIMITER) {
            this.position.turningAngle += TURN_FORCE * Storage.deltaTime;
            if (this.velocity.x > MAX_FRICTION) {
                this.velocity.y += this.velocity.x * FRICTION_FORCE * Storage.deltaTime;
            }
        }
    };
    Car.prototype.brake = function () {
        this.velocity.x -= Storage.deltaTime * BRAKE;
    };
    Car.prototype.acceleration = function () {
        this.velocity.x += Storage.deltaTime * THROTTLE;
    };
    Car.prototype.isCollidingWithRacingTrack = function (track) {
        for (var i = 0; i < track.getFirstLine().length; i++) {
            if ((Math.abs(track.getFirstLine()[i].x - this.position.coordinate.x) < 3 &&
                Math.abs(track.getFirstLine()[i].y - this.position.coordinate.y) <
                    3) ||
                (Math.abs(track.getSecondLine()[i].x - this.position.coordinate.x) <
                    3 &&
                    Math.abs(track.getSecondLine()[i].y - this.position.coordinate.y) < 3)) {
                return true;
            }
        }
        return false;
    };
    Car.prototype.toRespawn = function () {
        this.position = {
            coordinate: Storage.getData('SPAWN_CAR_POSITION'),
            turningAngle: Storage.getData('SPAWN_CAR_POSITION_ANGLE'),
        };
        this.velocity = new Vector2(0, 0);
    };
    return Car;
}());
export { Car };
//# sourceMappingURL=Car.js.map