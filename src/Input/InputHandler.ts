import { Car } from '../models/Car.js'
import {
  AccelerationCommand,
  BrakeCommand,
  TurnLeftCommand,
  TurnRightCommand,
} from './CarCommands.js'
import { ICommand } from './ICommand.js'
import { InputAction } from './InputAction.js'

export class InputHandler {
  private static _instance: InputHandler
  private static _bindActions: {
    [name: string]: { action: InputAction; command: ICommand }
  } = {}
  private static _player: Car

  private constructor() {
    this.addAction('W', new InputAction([87]), new AccelerationCommand())
    this.addAction('S', new InputAction([83]), new BrakeCommand())
    this.addAction('A', new InputAction([65]), new TurnLeftCommand())
    this.addAction('D', new InputAction([68]), new TurnRightCommand())

    window.addEventListener('keydown', event => {
      for (const action of Object.values(InputHandler._bindActions)) {
        if (action.action.checkKeyCode(event.keyCode)) {
          action.action.pressed = true
        }
      }
    })

    window.addEventListener('keyup', event => {
      for (const action of Object.values(InputHandler._bindActions)) {
        if (action.action.checkKeyCode(event.keyCode)) {
          action.action.pressed = false
        }
      }
    })
  }

  public static get instance(): InputHandler {
    return this._instance || (this._instance = new this())
  }

  public addAction(name: string, action: InputAction, command: ICommand): void {
    InputHandler._bindActions[name] = {
      action,
      command,
    }
  }

  public static start(car: Car): void {
    this._player = car
  }

  public static update(): void {
    if (this._player) {
      for (const action of Object.values(InputHandler._bindActions)) {
        if (action.action.pressed) {
          action.command.execute(this._player)
        }
      }
    }
  }
}

const InputHandlerInstance = InputHandler.instance
