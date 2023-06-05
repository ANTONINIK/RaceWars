import { Point } from '../models/Track.js'
import { Vector2 } from '../models/Vector2.js'

export class Storage {
  private static _instance: Storage
  private static _data: { [key: string]: any }
  private static _deltaTime: number

  private constructor() {
    Storage._data = JSON.parse(localStorage.getItem('data'))
    if (!Storage._data) {
      Storage._data = {}
      Storage._data['WIDTH'] = 512
      Storage._data['HEIGHT'] = 288
      Storage._data['DPI_HEIGHT'] = Storage._data['HEIGHT'] * 2
      Storage._data['DPI_WIDTH'] = Storage._data['WIDTH'] * 2
      Storage._data['CAR_NAME'] = 'Anton'
      Storage._data['COLOR_CAR_BODY'] = 'red'
      Storage._data['COLOR_CAR_ROOF'] = 'blue'
      Storage._data['COLOR_CAR_TIRE_TRACKS'] = 'grey'
      Storage._data['SPAWN_CAR_POSITION'] = new Vector2(0, 0)
      Storage._data['SPAWN_CAR_POSITION_ANGLE'] = 0
      Storage._data['TRACK_POINTS'] = [
        new Point(new Vector2(121, 94), true),
        new Point(new Vector2(149, 110), false),
        new Point(new Vector2(654, 39), true),
        new Point(new Vector2(777, 69), true),
        new Point(new Vector2(0, 0), false),
        new Point(new Vector2(981, 336), true),
        new Point(new Vector2(906, 390), true),
        new Point(new Vector2(0, 0), false),
        new Point(new Vector2(326, 454), true),
        new Point(new Vector2(191, 392), true),
        new Point(new Vector2(0, 0), false),
        new Point(new Vector2(33, 46), true),
      ]
    }
  }

  public static get instance(): Storage {
    return this._instance || (this._instance = new this())
  }

  public static get deltaTime(): number {
    return this._deltaTime
  }

  public static set deltaTime(deltaTime: number) {
    this._deltaTime = deltaTime
  }

  public static save(): void {
    localStorage.setItem('data', JSON.stringify(this._data))
  }

  public static setData(key: string, value: any) {
    this._data[key] = value
  }

  public static getData(key: string): any {
    return this._data[key]
  }
}

window.onunload = () => {
  Storage.save()
}

const StorageInstance = Storage.instance
