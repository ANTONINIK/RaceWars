import { Storage } from "../storage/Storage.js"

export class GameWorld {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private gameObjects: IGameObject[] = []

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.canvas.style.width = Storage.getData('WIDTH')
    this.canvas.style.height = Storage.getData('HEIGHT')
    this.canvas.width = +Storage.getData('DPI_WIDTH')
    this.canvas.height = +Storage.getData('DPI_HEIGHT')
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
  startRendering(): void {
    const renderLoop = (): void => {
      this.draw()
      requestAnimationFrame(renderLoop)
    }
    renderLoop()
  }
}
