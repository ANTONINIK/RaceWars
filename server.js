const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const port = '8080'
let trackPoints = require('./trackConfig.js')

app.set('port', port)

app.use('/static', express.static(__dirname + '/static'))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/static', 'index.html'))
})

server.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

const cars = {}
const bestLaps = new Map()

io.on('connection', socket => {
  console.log(`Connection is established: ${socket.id}`)

  socket.emit('track', trackPoints)

  socket.on('new track', newPoints => {
    trackPoints = newPoints
    bestLaps.clear()
    io.sockets.emit('track', trackPoints)
  })

  socket.on('update', car => {
    cars[socket.id] = car
  })

  socket.on('new lap', data => {
    if (bestLaps.has(data.name)) {
      if (bestLaps.get(data.name) > Number(data.time)) {
        bestLaps.set(data.name, data.time)
      }
    } else {
      bestLaps.set(data.name, data.time)
    }
  })

  socket.on('disconnect', () => {
    delete cars[socket.id]
    console.log(`disconnect: ${socket.id}`)
  })
})

setInterval(() => {
  if (cars && io) {
    io.sockets.emit('state', cars)
  }
}, 1000 / 10)

setInterval(() => {
  if (bestLaps.size > 0 && io) {
    io.sockets.emit('bestLaps', JSON.stringify(Array.from(bestLaps)))
  }
}, 1000)
