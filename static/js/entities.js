import Track from './classes/track.js'
import Car from './classes/car.js'
import Telemetry from './classes/telemetry.js'

const playerCar = new Car({
  id: null,
  name: 'Anonymous'
})
let enemyCars = null
const track = new Track()
//const telemetry = new Telemetry()
let mapBestLaps = null
export { playerCar, enemyCars, track, mapBestLaps }

//socket.io implementation...
const socket = io()
socket.on('connect', () => {
  playerCar.id = socket.id
})

socket.on('track', points => {
  track.points = points
  track.update(points)
  playerCar.setRespawn(track.carRespawn)
})

socket.on('state', state => {
  enemyCars = state
})

socket.on('bestLaps', data => {
  mapBestLaps = new Map(JSON.parse(data))
  mapBestLaps = new Map([...mapBestLaps.entries()].sort((a, b) => a[1] - b[1]))
})

setInterval(() => {
  if (playerCar) socket.emit('update', playerCar)
}, 1000 / 10)

export function updateTrack() {
  socket.emit('new track', track.points)
}
