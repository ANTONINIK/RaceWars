const WIDTH: number = 512
const HEIGHT: number = 288
const DPI_WIDTH: number = WIDTH * 2
const DPI_HEIGHT: number = HEIGHT * 2

class GameWorld implements IGameObject {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private gameObjects: Array<IGameObject> = []

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
  remove(idx: number): void {
    if (idx > -1) {
      this.gameObjects.splice(idx, 1)
    }
  }
  draw(ctx: CanvasRenderingContext2D): void {
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(ctx)
    })
  }
}
