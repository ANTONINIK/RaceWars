export function rotateObject(
  x: number,
  y: number,
  angle: number
): { x: number; y: number } {
  return {
    x: Math.cos(angle) * x + Math.sin(angle) * y,
    y: Math.sin(angle) * x - Math.cos(angle) * y
  }
}

export function getVectorLength(x: number, y: number): number {
  return Math.sqrt(x * x + y * y)
}
