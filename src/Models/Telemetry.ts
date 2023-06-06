import { Storage } from '../storage/Storage.js'
import { Car } from './Car.js'
import { Track } from './Track.js'

export class Telemetry implements IGameObject {
  private lastLapTime: number = 0
  private counterLaps: number = 0
  private timer: number = 0
  private passedPoints: boolean[] = []
  private htmlLaps: HTMLElement = document.getElementById('laps')
  private htmlTimer: HTMLElement = document.getElementById('timer')
  private htmlLastLap: HTMLElement = document.getElementById('last-lap')
  private car: Car
  private track: Track

  constructor(car: Car, track: Track) {
    this.car = car
    this.track = track
    this.display()
  }

  public update(): void {
    this.timer += Storage.deltaTime
    this.track.getCheckPoints().forEach((checkPoint: any, index: number) => {
      if (
        Math.abs(checkPoint.x - this.car.getPosition().coordinate.x) < 40 &&
        Math.abs(checkPoint.y - this.car.getPosition().coordinate.y) < 40
      ) {
        if (index === 0) {
          if (
            this.passedPoints[0] &&
            this.passedPoints[1] &&
            this.passedPoints[2]
          ) {
            this.lastLapTime = this.timer
            this.counterLaps++
            this.newLap()
          }
          this.reset()
        }
        this.passedPoints[index] = true
      }
    })
    if (this.htmlTimer) {
      this.htmlTimer.textContent = `Timer: ${this.timer.toFixed(2)} s`
    }
  }

  private newLap(): void {
    if (this.htmlLastLap) {
      this.htmlLastLap.textContent = `Last lap: ${this.lastLapTime.toFixed(
        2
      )} s`
    }
    if (this.htmlLaps) {
      this.htmlLaps.textContent = `Laps: ${this.counterLaps}`
    }
    const bestlaps = Storage.getData('BEST_LAPS')
    bestlaps.push({
      name: Storage.getData('CAR_NAME'),
      lapTime: this.lastLapTime
    })
    Storage.setData('BEST_LAPS', bestlaps)
  }

  public display(): void {
    const gameInfo = document.getElementById('game-info')
    if (gameInfo) {
      gameInfo.classList.toggle('hidden')
    }
  }

  private reset(): void {
    this.passedPoints = Array(3).fill(false)
    if (this.timer > 1) {
      this.timer = 0
    }
  }

  public draw(): void {}
}
