var CapturePointCommand = (function () {
    function CapturePointCommand(track) {
        this.receiver = track;
    }
    CapturePointCommand.prototype.execute = function (event) {
        this.receiver.capturePoint(event);
    };
    return CapturePointCommand;
}());
export { CapturePointCommand };
var MovePointCommand = (function () {
    function MovePointCommand(track) {
        this.receiver = track;
    }
    MovePointCommand.prototype.execute = function (event) {
        this.receiver.movePoint(event);
    };
    return MovePointCommand;
}());
export { MovePointCommand };
//# sourceMappingURL=TrackCommands.js.map