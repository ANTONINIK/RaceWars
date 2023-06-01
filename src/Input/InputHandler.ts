export class InputHandler {
  private static _instance: InputHandler

  private constructor() {}

  public static get instance(): InputHandler {
    return this._instance || (this._instance = new this())
  }
}

const InputHandlerInstance = InputHandler.instance
