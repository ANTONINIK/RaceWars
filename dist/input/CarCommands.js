var TurnLeftCommand = (function () {
    function TurnLeftCommand(car) {
        this.receiver = car;
    }
    TurnLeftCommand.prototype.execute = function () {
        this.receiver.turnLeft();
    };
    return TurnLeftCommand;
}());
export { TurnLeftCommand };
var TurnRightCommand = (function () {
    function TurnRightCommand(car) {
        this.receiver = car;
    }
    TurnRightCommand.prototype.execute = function () {
        this.receiver.turnRight();
    };
    return TurnRightCommand;
}());
export { TurnRightCommand };
var BrakeCommand = (function () {
    function BrakeCommand(car) {
        this.receiver = car;
    }
    BrakeCommand.prototype.execute = function () {
        this.receiver.brake();
    };
    return BrakeCommand;
}());
export { BrakeCommand };
var AccelerationCommand = (function () {
    function AccelerationCommand(car) {
        this.receiver = car;
    }
    AccelerationCommand.prototype.execute = function () {
        this.receiver.acceleration();
    };
    return AccelerationCommand;
}());
export { AccelerationCommand };
//# sourceMappingURL=CarCommands.js.map