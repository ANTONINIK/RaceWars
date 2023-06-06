import { AccelerationCommand, BrakeCommand, TurnLeftCommand, TurnRightCommand, } from './CarCommand.js';
import { InputAction } from './InputAction.js';
import { CapturePointCommand, MovePointCommand, ReleasePointCommand, } from './TrackCommand.js';
var InputHandler = (function () {
    function InputHandler() {
        window.addEventListener('keydown', function (event) {
            if (InputHandler._keyboardActions) {
                for (var _i = 0, _a = Object.values(InputHandler._keyboardActions); _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.action.checkKeyCode(event.keyCode)) {
                        item.action.pressed = true;
                    }
                }
            }
        });
        window.addEventListener('keyup', function (event) {
            if (InputHandler._keyboardActions) {
                for (var _i = 0, _a = Object.values(InputHandler._keyboardActions); _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.action.checkKeyCode(event.keyCode)) {
                        item.action.pressed = false;
                    }
                }
            }
        });
        var canvas = document.getElementById('canvas');
        canvas.addEventListener('mousedown', function (event) {
            if (InputHandler._mouseActions) {
                InputHandler._mouseActions['click'].execute(event);
            }
        });
        canvas.addEventListener('mousemove', function (event) {
            if (InputHandler._mouseActions) {
                InputHandler._mouseActions['move'].execute(event);
            }
        });
        canvas.addEventListener('mouseup', function (event) {
            if (InputHandler._mouseActions) {
                InputHandler._mouseActions['release'].execute(event);
            }
        });
    }
    Object.defineProperty(InputHandler, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    InputHandler.initKeyboardActions = function (car) {
        this.addKeyboardAction('W', new InputAction([87]), new AccelerationCommand(car));
        this.addKeyboardAction('S', new InputAction([83]), new BrakeCommand(car));
        this.addKeyboardAction('A', new InputAction([65]), new TurnLeftCommand(car));
        this.addKeyboardAction('D', new InputAction([68]), new TurnRightCommand(car));
    };
    InputHandler.initMouseActions = function (track) {
        this.addMouseAction('click', new CapturePointCommand(track));
        this.addMouseAction('move', new MovePointCommand(track));
        this.addMouseAction('release', new ReleasePointCommand(track));
    };
    InputHandler.removeKeyboardActions = function () {
        InputHandler._keyboardActions = null;
    };
    InputHandler.removeMouseActions = function () {
        InputHandler._mouseActions = null;
    };
    InputHandler.addKeyboardAction = function (name, action, command) {
        if (!InputHandler._keyboardActions) {
            InputHandler._keyboardActions = {};
        }
        InputHandler._keyboardActions[name] = {
            action: action,
            command: command,
        };
    };
    InputHandler.addMouseAction = function (name, command) {
        if (!InputHandler._mouseActions) {
            InputHandler._mouseActions = {};
        }
        InputHandler._mouseActions[name] = command;
    };
    InputHandler.updateKeyboardActions = function () {
        if (InputHandler._keyboardActions) {
            for (var _i = 0, _a = Object.values(InputHandler._keyboardActions); _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.action.pressed) {
                    item.command.execute();
                }
            }
        }
    };
    return InputHandler;
}());
export { InputHandler };
var InputHandlerInstance = InputHandler.instance;
//# sourceMappingURL=InputHandler.js.map