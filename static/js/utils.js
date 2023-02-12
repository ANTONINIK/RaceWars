export function rotatedObject({ x, y }, angle) {
  return {
    x: Math.cos(angle) * x + Math.sin(angle) * y,
    y: Math.sin(angle) * x - Math.cos(angle) * y
  }
}
export function vectorLength(vec) {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
}
