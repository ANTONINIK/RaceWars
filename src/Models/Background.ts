import { Storage } from '../storage/Storage.js'

export class Background implements IGameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.fillStyle = 'rgb(36, 38, 48)'
    ctx.fillRect(
      0,
      0,
      +Storage.getData('DPI_WIDTH'),
      +Storage.getData('DPI_HEIGHT')
    )
    ctx.closePath()
  }
  update(): void {}
}
