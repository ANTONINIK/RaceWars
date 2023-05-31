export class Storage {
  private static _instance: Storage
  private static _data: { [key: string]: number | string }
  private static _deltaTime: number

  private constructor() {
    Storage._data = JSON.parse(localStorage.getItem('data'))
    if (!Storage._data) {
      Storage._data = {}
      Storage._data['WIDTH'] = 512
      Storage._data['HEIGHT'] = 512
      Storage._data['DPI_HEIGHT'] = Storage._data['HEIGHT'] * 2
      Storage._data['DPI_WIDTH'] = Storage._data['WIDTH'] * 2
      Storage._data['CAR_NAME'] = 'Anton'
      Storage._data['COLOR_CAR_BODY'] = 'red'
      Storage._data['COLOR_CAR_ROOF'] = 'blue'
      Storage._data['COLOR_CAR_TIRE_TRACKS'] = 'grey'
      Storage._data['SPAWN_CAR_POSITION_X'] = 0
      Storage._data['SPAWN_CAR_POSITION_Y'] = 0
      Storage._data['SPAWN_CAR_POSITION_ANGLE'] = 0
      Storage.save()
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

  private static save(): void {
    localStorage.setItem('data', JSON.stringify(this._data))
  }

  public static setData(key: string, value: string) {
    this._data[key] = value
    this.save()
  }

  public static getData(key: string): string {
    return this._data[key].toString()
  }
}

const StorageInstance = Storage.instance
