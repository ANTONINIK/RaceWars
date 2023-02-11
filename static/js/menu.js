import { playerCar, mapBestLaps, updateTrack } from './entities.js'

const closeBtn = document.getElementById('close-btn')
const closeBtnIn = document.getElementById('close-btn-inner')
closeBtn.addEventListener('click', openMenu)
closeBtnIn.addEventListener('click', () => {
  toggleSecondMenu()
  carSettings.classList.add('hidden')
  bestLaps.classList.add('hidden')
})

const startBtn = document.getElementById('start-btn')
startBtn.addEventListener('click', () => {
  gameMode = 0
  toggleMainMenu()
})

const trackEditorBtn = document.getElementById('track-editor-btn')
trackEditorBtn.addEventListener('click', () => {
  gameMode = 1
  toggleMainMenu()
  saveTrackBtn.classList.toggle('hidden')
})
const saveTrackBtn = document.getElementById('save-track-btn')
saveTrackBtn.addEventListener('click', () => {
  openMenu()
  updateTrack()
})

const carName = document.getElementById('carName')
const carColor = document.getElementById('carColor')
const carRoof = document.getElementById('carRoof')
const carTrack = document.getElementById('carTrack')
const demoCar = document.getElementById('demo-car')
const demoRoof = document.getElementById('demo-roof')
const carSettings = document.getElementById('car-settings')
const carSettingsBtn = document.getElementById('car-settings-btn')
carSettingsBtn.addEventListener('click', () => {
  gameMode = 2
  toggleSecondMenu()
  carSettings.classList.toggle('hidden')
  carName.value = playerCar.name
  carTrack.value = playerCar.color.track
  demoCar.style.background = carColor.value = playerCar.color.car
  demoRoof.style.background = carRoof.value = playerCar.color.roof
})
const form = document.getElementById('form')
form.addEventListener('submit', event => {
  event.preventDefault()
  playerCar.name = carName.value
  playerCar.color.track = carTrack.value
  demoCar.style.background = playerCar.color.car = carColor.value
  demoRoof.style.background = playerCar.color.roof = carRoof.value
})

const tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0]
const bestLaps = document.getElementById('best-laps')
const bestLapsBtn = document.getElementById('best-laps-btn')
bestLapsBtn.addEventListener('click', () => {
  gameMode = 3
  toggleSecondMenu()
  bestLaps.classList.toggle('hidden')
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

const gameMenu = document.getElementById('game-menu')
const main = document.getElementById('main')
function toggleMainMenu() {
  gameMenu.classList.toggle('hidden')
  closeBtn.classList.toggle('hidden')
  closeBtnIn.classList.toggle('hidden')
  saveTrackBtn.classList.add('hidden')
}

function toggleSecondMenu() {
  main.classList.toggle('hidden')
  closeBtnIn.classList.toggle('hidden')
}

function openMenu() {
  gameMode = -1
  toggleMainMenu()
}

export let gameMode = -1
