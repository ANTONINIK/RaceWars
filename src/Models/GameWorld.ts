const WIDTH: number = 512
const HEIGHT: number = 288
const DPI_WIDTH: number = WIDTH * 2
const DPI_HEIGHT: number = HEIGHT * 2

export class GameWorld {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private gameObjects: IGameObject[] = []

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.canvas.style.width = WIDTH.toString()
    this.canvas.style.height = HEIGHT.toString()
    this.canvas.width = DPI_WIDTH
    this.canvas.height = DPI_HEIGHT
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
