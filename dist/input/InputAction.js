var InputAction = (function () {
    function InputAction(keyCodes) {
        this.pressed = false;
        this.keyCodes = keyCodes;
    }
    InputAction.prototype.addKeyCode = function (keyCode) {
        if (!this.keyCodes.includes(keyCode)) {
            this.keyCodes.push(keyCode);
        }
    };
    InputAction.prototype.removeKeyCode = function (keyCode) {
        var index = this.keyCodes.indexOf(keyCode);
        if (index !== -1) {
            this.keyCodes.splice(index, 1);
        }
    };
    InputAction.prototype.checkKeyCode = function (keyCode) {
        return this.keyCodes.includes(keyCode);
    };
    return InputAction;
}());
export { InputAction };
//# sourceMappingURL=InputAction.js.map