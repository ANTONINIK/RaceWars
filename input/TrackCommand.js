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
var TrackCommand = (function () {
    function TrackCommand(track) {
        this.receiver = track;
    }
    return TrackCommand;
}());
export { TrackCommand };
var CapturePointCommand = (function (_super) {
    __extends(CapturePointCommand, _super);
    function CapturePointCommand(track) {
        return _super.call(this, track) || this;
    }
    CapturePointCommand.prototype.execute = function (event) {
        this.receiver.capturePoint(event);
    };
    return CapturePointCommand;
}(TrackCommand));
export { CapturePointCommand };
var MovePointCommand = (function (_super) {
    __extends(MovePointCommand, _super);
    function MovePointCommand(track) {
        return _super.call(this, track) || this;
    }
    MovePointCommand.prototype.execute = function (event) {
        this.receiver.movePoint(event);
    };
    return MovePointCommand;
}(TrackCommand));
export { MovePointCommand };
var ReleasePointCommand = (function (_super) {
    __extends(ReleasePointCommand, _super);
    function ReleasePointCommand(track) {
        return _super.call(this, track) || this;
    }
    ReleasePointCommand.prototype.execute = function (event) {
        this.receiver.releasePoint(event);
    };
    return ReleasePointCommand;
}(TrackCommand));
export { ReleasePointCommand };
//# sourceMappingURL=TrackCommand.js.map