import { Storage } from '../storage/Storage.js'
import { GameLoop } from './GameLoop.js'
import { Race } from './modes/Race.js'
import { TrackEditor } from './modes/TrackEditor.js'

export class Menu {
  private closeBtn: HTMLElement
  private closeBtnIn: HTMLElement
  private startBtn: HTMLElement
  private trackEditorBtn: HTMLElement
  private saveTrackBtn: HTMLElement
  private carName: HTMLInputElement
  private carColor: HTMLInputElement
  private carRoof: HTMLInputElement
  private carTrack: HTMLInputElement
  private demoCar: HTMLElement
  private demoRoof: HTMLElement
  private carSettings: HTMLElement
  private carSettingsBtn: HTMLElement
  private form: HTMLElement
  private tbodyRef: HTMLTableSectionElement
  private bestLaps: HTMLElement
  private bestLapsBtn: HTMLElement
  private gameMenu: HTMLElement
  private main: HTMLElement

  private gameLoop: GameLoop

  constructor() {
    this.gameLoop = new GameLoop()

    this.closeBtn = document.getElementById('close-btn')
    this.closeBtnIn = document.getElementById('close-btn-inner')
    this.startBtn = document.getElementById('start-btn')
    this.trackEditorBtn = document.getElementById('track-editor-btn')
    this.saveTrackBtn = document.getElementById('save-track-btn')
    this.carName = document.getElementById('carName') as HTMLInputElement
    this.carColor = document.getElementById('carColor') as HTMLInputElement
    this.carRoof = document.getElementById('carRoof') as HTMLInputElement
    this.carTrack = document.getElementById('carTrack') as HTMLInputElement
    this.demoCar = document.getElementById('demo-car')
    this.demoRoof = document.getElementById('demo-roof')
    this.carSettings = document.getElementById('car-settings')
    this.carSettingsBtn = document.getElementById('car-settings-btn')
    this.form = document.getElementById('form')
    this.tbodyRef = document
      .getElementById('myTable')
      .getElementsByTagName('tbody')[0]
    this.bestLaps = document.getElementById('best-laps')
    this.bestLapsBtn = document.getElementById('best-laps-btn')
    this.gameMenu = document.getElementById('game-menu')
    this.main = document.getElementById('main')

    this.startBtn.addEventListener('click', () => {
      this.toggleMainMenu()
      this.gameLoop.setGameMode(new Race())
      this.gameLoop.executeGameMode()
    })

    this.closeBtn.addEventListener('click', () => {
      this.toggleMainMenu()
    })

    this.closeBtnIn.addEventListener('click', () => {
      this.toggleSecondMenu()
      this.carSettings.classList.add('hidden')
      this.bestLaps.classList.add('hidden')
    })

    this.trackEditorBtn.addEventListener('click', () => {
      this.toggleMainMenu()
      this.saveTrackBtn.classList.toggle('hidden')
      this.gameLoop.setGameMode(new TrackEditor())
      this.gameLoop.executeGameMode()
    })

    this.saveTrackBtn.addEventListener('click', () => {
      this.toggleMainMenu()
    })

    this.carSettingsBtn.addEventListener('click', () => {
      this.toggleSecondMenu()
      this.carSettings.classList.toggle('hidden')

      this.carName.value = Storage.getData('CAR_NAME')
      this.carTrack.value = Storage.getData('COLOR_CAR_TIRE_TRACKS')
      this.demoCar.style.background = this.carColor.value =
        Storage.getData('COLOR_CAR_BODY')
      this.demoRoof.style.background = this.carRoof.value =
        Storage.getData('COLOR_CAR_ROOF')
    })

    this.form.addEventListener('submit', event => {
      event.preventDefault()
      Storage.setData('CAR_NAME', this.carName.value)
      Storage.setData('COLOR_CAR_TIRE_TRACKS', this.carTrack.value)
      Storage.setData('COLOR_CAR_BODY', this.carColor.value)
      Storage.setData('COLOR_CAR_ROOF', this.carRoof.value)
      this.demoCar.style.background = this.carColor.value
      this.demoRoof.style.background = this.carRoof.value
    })

    this.bestLapsBtn.addEventListener('click', () => {
      this.toggleSecondMenu()
      this.bestLaps.classList.toggle('hidden')
      const bestLaps: { name: string; lapTime: number }[] =
        Storage.getData('BEST_LAPS')
      if (bestLaps) {
        const table: HTMLTableElement = document.getElementById(
          'myTable'
        ) as HTMLTableElement
        const rowCount = table.rows.length
        for (let i = 0; i < rowCount; i++) {
          table.deleteRow(i)
        }
        bestLaps.forEach(lap => {
          const newRow = this.tbodyRef.insertRow()
          let newCell = newRow.insertCell()
          let newText = document.createTextNode(lap.name)
          newCell.appendChild(newText)
          newCell = newRow.insertCell()
          newText = document.createTextNode(lap.lapTime.toFixed(3))
          newCell.appendChild(newText)
        })
      }
    })
  }

  private toggleMainMenu() {
    this.gameMenu.classList.toggle('hidden')
    this.closeBtn.classList.toggle('hidden')
    this.closeBtnIn.classList.toggle('hidden')
    this.saveTrackBtn.classList.add('hidden')
  }

  private toggleSecondMenu() {
    this.main.classList.toggle('hidden')
    this.closeBtnIn.classList.toggle('hidden')
  }
}
