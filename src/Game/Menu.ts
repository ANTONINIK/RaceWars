import { GameLoop } from "./GameLoop.js"
import { Race } from "./modes/Race.js"

export class Menu {
  private closeBtn: HTMLElement
  private closeBtnIn: HTMLElement
  private startBtn: HTMLElement
  private trackEditorBtn: HTMLElement
  private saveTrackBtn: HTMLElement
  private carName: HTMLElement
  private carColor: HTMLElement
  private carRoof: HTMLElement
  private carTrack: HTMLElement
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
    this.gameLoop = new GameLoop();

    this.closeBtn = document.getElementById('close-btn')
    this.closeBtnIn = document.getElementById('close-btn-inner')
    this.startBtn = document.getElementById('start-btn')
    this.trackEditorBtn = document.getElementById('track-editor-btn')
    this.saveTrackBtn = document.getElementById('save-track-btn')
    this.carName = document.getElementById('carName')
    this.carColor = document.getElementById('carColor')
    this.carRoof = document.getElementById('carRoof')
    this.carTrack = document.getElementById('carTrack')
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
    })

    this.trackEditorBtn.addEventListener('click', () => {})

    this.saveTrackBtn.addEventListener('click', () => {})

    this.carSettingsBtn.addEventListener('click', () => {})

    this.form.addEventListener('submit', () => {})

    this.bestLapsBtn.addEventListener('click', () => {})
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
