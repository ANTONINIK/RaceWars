export class InputAction {
  public pressed: boolean
  private keyCodes: number[]

  constructor(keyCodes: number[]) {
    this.pressed = false
    this.keyCodes = keyCodes
  }

  public addKeyCode(keyCode: number): void {
    if (!this.keyCodes.includes(keyCode)) {
      this.keyCodes.push(keyCode)
    }
  }

  public removeKeyCode(keyCode: number): void {
    const index = this.keyCodes.indexOf(keyCode)
    if (index !== -1) {
      this.keyCodes.splice(index, 1)
    }
  }

  public checkKeyCode(keyCode: number): boolean {
    return this.keyCodes.includes(keyCode)
  }
}
