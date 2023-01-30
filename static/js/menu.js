const gameMenu = document.getElementById('game-menu')

const main = document.getElementById('main')
const carSettings = document.getElementById('car-settings')
const bestLaps = document.getElementById('best-laps')

const closeBtn = document.getElementById('close-btn')
const closeBtnIn = document.getElementById('close-btn-inner')
const saveTrack = document.getElementById('save-track')
const startBtn = document.getElementById('start-btn')
const trackEditorBtn = document.getElementById('track-editor-btn')
const carSettingsBtn = document.getElementById('car-settings-btn')
const bestLapsBtn = document.getElementById('best-laps-btn')

const carName = document.getElementById('carName')
const carColor = document.getElementById('carColor')
const carRoof = document.getElementById('carRoof')
const carTrack = document.getElementById('carTrack')

const demoCar = document.getElementById('demo-car')
const demoRoof = document.getElementById('demo-roof')

const form = document.getElementById('form')

const tbodyRef = document
  .getElementById('myTable')
  .getElementsByTagName('tbody')[0]

let gameMode = -1
let mapBestLaps = null

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey)
    if (isNotCombinedKey) {
      gameMode = -1
      gameMenu.classList.remove('hidden')
      main.classList.remove('hidden')
      carSettings.classList.add('hidden')
      bestLaps.classList.add('hidden')
      closeBtn.classList.add('hidden')
      closeBtnIn.classList.add('hidden')
      saveTrack.classList.add('hidden')
    }
  }
})

form.addEventListener('submit', event => {
  event.preventDefault()
  playerCar.name = carName.value
  playerCar.color.car = carColor.value
  playerCar.color.roof = carRoof.value
  playerCar.color.track = carTrack.value
  demoCar.style.background = playerCar.color.car
  demoRoof.style.background = playerCar.color.roof
})

closeBtn.addEventListener('click', event => {
  gameMode = -1
  gameMenu.classList.remove('hidden')
  main.classList.remove('hidden')
  carSettings.classList.add('hidden')
  bestLaps.classList.add('hidden')
  closeBtn.classList.add('hidden')
  closeBtnIn.classList.add('hidden')
})

closeBtnIn.addEventListener('click', event => {
  gameMode = -1
  gameMenu.classList.remove('hidden')
  main.classList.remove('hidden')
  carSettings.classList.add('hidden')
  bestLaps.classList.add('hidden')
  closeBtn.classList.add('hidden')
  closeBtnIn.classList.add('hidden')
})

saveTrack.addEventListener('click', event => {
  gameMode = -1
  gameMenu.classList.remove('hidden')
  main.classList.remove('hidden')
  carSettings.classList.add('hidden')
  bestLaps.classList.add('hidden')
  closeBtn.classList.add('hidden')
  closeBtnIn.classList.add('hidden')
  saveTrack.classList.add('hidden')
  socket.emit('new track', track.points)
})

startBtn.addEventListener('click', event => {
  gameMode = 0
  gameMenu.classList.add('hidden')
  main.classList.add('hidden')
  closeBtn.classList.remove('hidden')
})

trackEditorBtn.addEventListener('click', event => {
  gameMode = 1
  gameMenu.classList.add('hidden')
  main.classList.add('hidden')
  closeBtn.classList.remove('hidden')
  saveTrack.classList.remove('hidden')
})

carSettingsBtn.addEventListener('click', event => {
  gameMode = 2
  main.classList.add('hidden')
  carSettings.classList.remove('hidden')
  closeBtnIn.classList.remove('hidden')
  carName.value = playerCar.name
  carColor.value = playerCar.color.car
  carRoof.value = playerCar.color.roof
  carTrack.value = playerCar.color.track
  demoCar.style.background = carColor.value
  demoRoof.style.background = carRoof.value
})

bestLapsBtn.addEventListener('click', event => {
  gameMode = 3
  main.classList.add('hidden')
  bestLaps.classList.remove('hidden')
  closeBtnIn.classList.remove('hidden')
  if (mapBestLaps) {
    const table = document.getElementById('myTable')
    const rowCount = table.rows.length
    for (let i = 0; i < rowCount; i++) {
      table.deleteRow(i)
    }
    mapBestLaps.forEach((time, name) => {
      const newRow = tbodyRef.insertRow()
      let newCell = newRow.insertCell()
      let newText = document.createTextNode(name)
      newCell.appendChild(newText)
      newCell = newRow.insertCell()
      newText = document.createTextNode(time)
      newCell.appendChild(newText)
    })
  }
})
