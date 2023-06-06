var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CarCommand = (function () {
    function CarCommand(car) {
        this.receiver = car;
    }
    return CarCommand;
}());
export { CarCommand };
var TurnLeftCommand = (function (_super) {
    __extends(TurnLeftCommand, _super);
    function TurnLeftCommand(car) {
        return _super.call(this, car) || this;
    }
    TurnLeftCommand.prototype.execute = function () {
        this.receiver.turnLeft();
    };
    return TurnLeftCommand;
}(CarCommand));
export { TurnLeftCommand };
var TurnRightCommand = (function (_super) {
    __extends(TurnRightCommand, _super);
    function TurnRightCommand(car) {
        return _super.call(this, car) || this;
    }
    TurnRightCommand.prototype.execute = function () {
        this.receiver.turnRight();
    };
    return TurnRightCommand;
}(CarCommand));
export { TurnRightCommand };
var BrakeCommand = (function (_super) {
    __extends(BrakeCommand, _super);
    function BrakeCommand(car) {
        return _super.call(this, car) || this;
    }
    BrakeCommand.prototype.execute = function () {
        this.receiver.brake();
    };
    return BrakeCommand;
}(CarCommand));
export { BrakeCommand };
var AccelerationCommand = (function (_super) {
    __extends(AccelerationCommand, _super);
    function AccelerationCommand(car) {
        return _super.call(this, car) || this;
    }
    AccelerationCommand.prototype.execute = function () {
        this.receiver.acceleration();
    };
    return AccelerationCommand;
}(CarCommand));
export { AccelerationCommand };
//# sourceMappingURL=CarCommand.js.map