import { Car } from '../models/Car.js'
import { Track } from '../models/Track.js'
import {
  AccelerationCommand,
  BrakeCommand,
  TurnLeftCommand,
  TurnRightCommand,
} from './CarCommands.js'
import { ICommand } from './ICommand.js'
import { InputAction } from './InputAction.js'
import { CapturePointCommand, MovePointCommand } from './TrackCommands.js'

export class InputHandler {
  private static _instance: InputHandler
  private static _bindActions: {
    [name: string]: { action: InputAction; command: ICommand }
  } = {}
  private static _player: Car
  private static _track: Track

  private constructor() {
    this.addAction('W', new InputAction([87]), new AccelerationCommand())
    this.addAction('S', new InputAction([83]), new BrakeCommand())
    this.addAction('A', new InputAction([65]), new TurnLeftCommand())
    this.addAction('D', new InputAction([68]), new TurnRightCommand())

    this.addAction('C', new InputAction([150]), new CapturePointCommand())
    this.addAction('M', new InputAction([151]), new MovePointCommand())

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

    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.addEventListener('mousedown', event => {
      InputHandler._bindActions['C'].action.pressed = true
    })
    canvas.addEventListener('mousemove', event => {
      InputHandler._bindActions['M'].action.pressed = true
    })
    canvas.addEventListener('mouseup', event => {
      InputHandler._bindActions['C'].action.pressed = false
      InputHandler._bindActions['M'].action.pressed = false
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

  public static setTrack(track: Track) {
    this._track = track
  }
  
  public static setPlayer(car: Car) {
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
