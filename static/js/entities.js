import Track from './classes/track.js'
import Car from './classes/car.js'
import Telemetry from './classes/telemetry.js'
import { getStorageUser } from './storage.js'
import movement from './move.js'

const storageUser = getStorageUser()

const playerCar = new Car({
  id: null,
  name: storageUser ? storageUser.name : 'Anonymous',
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  rotationAngle: 0,
  tireTracks: [],
  color: storageUser
    ? storageUser.color
    : {
        car: '#FFA500',
        roof: '#FF0000',
        track: '#808080'
      }
})
let enemyCars = new Map()
const track = new Track()
const telemetry = new Telemetry()
let mapBestLaps = null
export { playerCar, enemyCars, track, mapBestLaps, telemetry }

//socket.io implementation...
const socket = io()
socket.on('connect', () => {
  playerCar.id = socket.id
})

socket.on('track', points => {
  track.points = points
  track.update(points)
  playerCar.setNewRespawn(track.carRespawn)
})

socket.on('state', state => {
  const ids = new Set([...enemyCars.keys()])
  for (const id in state) {
    ids.delete(id)
    if (id !== playerCar.id) {
      if (enemyCars.has(id)) {
        if (!equalMovements(enemyCars.get(id).movement, state[id].movement)) {
          enemyCars.get(id).movement = state[id].movement
          enemyCars.get(id).car.setData(state[id].playerCar)
        }
      } else {
        enemyCars.set(id, {
          car: new Car(state[id].playerCar),
          movement: state[id].movement
        })
      }
    }
  }
  ids.forEach(id => {
    enemyCars.delete(id)
  })
})

socket.on('bestLaps', data => {
  mapBestLaps = new Map(JSON.parse(data))
  mapBestLaps = new Map([...mapBestLaps.entries()].sort((a, b) => a[1] - b[1]))
})

setInterval(() => {
  if (playerCar)
    socket.emit('update', { playerCar: playerCar.getData(), movement })
}, 1000 / 20)

export function updateTrack() {
  socket.emit('new track', track.points)
}

export function updateBestLap(name, time) {
  socket.emit('new lap', { name, time })
}

function equalMovements(movement1, movement2) {
  return (
    movement1.left === movement2.left &&
    movement1.right === movement2.right &&
    movement1.up === movement2.up &&
    movement1.down === movement2.down
  )
}
