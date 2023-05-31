export function rotateObject(
  { x, y }: { x: number; y: number },
  angle: number
): { x: number; y: number } {
  return {
    x: Math.cos(angle) * x + Math.sin(angle) * y,
    y: Math.sin(angle) * x - Math.cos(angle) * y
  }
}

export function getVectorLength(vec: { x: number; y: number }): number {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
}
