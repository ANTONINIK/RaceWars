import { Car } from '../models/Car.js'
import { Track } from '../models/Track.js'
import {
  AccelerationCommand,
  BrakeCommand,
  CarCommand,
  TurnLeftCommand,
  TurnRightCommand,
} from './CarCommand.js'
import { InputAction } from './InputAction.js'
import {
  CapturePointCommand,
  MovePointCommand,
  ReleasePointCommand,
  TrackCommand,
} from './TrackCommand.js'

export class InputHandler {
  private static _instance: InputHandler
  private static _keyboardActions: {
    [name: string]: { action: InputAction; command: CarCommand }
  }
  private static _mouseActions: {
    [name: string]: TrackCommand
  }

  public static get instance(): InputHandler {
    return this._instance || (this._instance = new this())
  }

  constructor() {
    window.addEventListener('keydown', event => {
      for (const item of Object.values(InputHandler._keyboardActions)) {
        if (item.action.checkKeyCode(event.keyCode)) {
          item.action.pressed = true
        }
      }
    })

    window.addEventListener('keyup', event => {
      for (const item of Object.values(InputHandler._keyboardActions)) {
        if (item.action.checkKeyCode(event.keyCode)) {
          item.action.pressed = false
        }
      }
    })

    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.addEventListener('mousedown', event => {
      InputHandler._mouseActions['click']?.execute(event)
    })
    canvas.addEventListener('mousemove', event => {
      InputHandler._mouseActions['move']?.execute(event)
    })
    canvas.addEventListener('mouseup', event => {
      InputHandler._mouseActions['release']?.execute(event)
    })
  }

  public static initKeyboardActions(car: Car) {
    this.addKeyboardAction('W', new InputAction([87]), new AccelerationCommand(car))
    this.addKeyboardAction('S', new InputAction([83]), new BrakeCommand(car))
    this.addKeyboardAction('A', new InputAction([65]), new TurnLeftCommand(car))
    this.addKeyboardAction('D', new InputAction([68]), new TurnRightCommand(car))
  }

  public static initMouseActions(track: Track) {
    this.addMouseAction('click', new CapturePointCommand(track))
    this.addMouseAction('move', new MovePointCommand(track))
    this.addMouseAction('release', new ReleasePointCommand(track))
  }

  public static removeKeyboardActions() {
    InputHandler._keyboardActions = {}
  }

  public static removeMouseActions() {
    InputHandler._mouseActions = {}
  }

  private static addKeyboardAction(
    name: string,
    action: InputAction,
    command: CarCommand
  ): void {
    if (!InputHandler._keyboardActions) {
      InputHandler._keyboardActions = {}
    }

    InputHandler._keyboardActions[name] = {
      action,
      command,
    }
  }

  private static addMouseAction(name: string, command: TrackCommand): void {
    if (!InputHandler._mouseActions) {
      InputHandler._mouseActions = {}
    }

    InputHandler._mouseActions[name] = command
  }

  public static updateKeyboardActions(): void {
    if (InputHandler._keyboardActions) {
      for (const item of Object.values(InputHandler._keyboardActions)) {
        if (item.action.pressed) {
          item.command.execute()
        }
      }
    }
  }
}

const InputHandlerInstance = InputHandler.instance