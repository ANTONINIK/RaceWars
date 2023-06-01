import { Storage } from '../storage/Storage.js'
import { Background } from './Background.js'
import { Car } from './Car.js'
import { Track } from './Track.js'

export class GameWorld {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private gameObjects: IGameObject[] = []
  private track: Track
  private background: Background
  private previousTimeStamp: number

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.canvas.style.width = Storage.getData('WIDTH')
    this.canvas.style.height = Storage.getData('HEIGHT')
    this.canvas.width = +Storage.getData('DPI_WIDTH')
    this.canvas.height = +Storage.getData('DPI_HEIGHT')

    this.track = new Track()
    this.background = new Background()

    this.add(this.track)
    this.add(this.background)
  }

  add(gameObject: IGameObject): void {
    this.gameObjects.push(gameObject)
  }

  remove(): void {
    this.gameObjects = []
  }

  draw(): void {
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(this.context)
    })
  }

  update(): void {
    this.gameObjects.forEach(gameObject => {
      gameObject.update()

      // Проверка коллизии между машиной и трассой
      if (gameObject instanceof Car && this.track instanceof Track) {
        if (gameObject.isCollidingWithRacingTrack(this.track)) {
          gameObject.toRespawn()
        }
      }
    })
  }

  startRendering(): void {
    const renderLoop = (timestamp?: number): void => {
      if (this.previousTimeStamp == null) {
        this.previousTimeStamp = timestamp
      }
      Storage.deltaTime = (timestamp - this.previousTimeStamp) / 1000
      this.previousTimeStamp = timestamp

      this.update()
      this.draw()

      requestAnimationFrame(renderLoop)
    }
    renderLoop()
  }
}
