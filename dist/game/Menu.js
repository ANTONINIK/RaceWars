import { Storage } from '../storage/Storage.js';
import { GameLoop } from './GameLoop.js';
import { Race } from './modes/Race.js';
import { TrackEditor } from './modes/TrackEditor.js';
var Menu = (function () {
    function Menu() {
        var _this = this;
        this.gameLoop = new GameLoop();
        this.closeBtn = document.getElementById('close-btn');
        this.closeBtnIn = document.getElementById('close-btn-inner');
        this.startBtn = document.getElementById('start-btn');
        this.trackEditorBtn = document.getElementById('track-editor-btn');
        this.saveTrackBtn = document.getElementById('save-track-btn');
        this.carName = document.getElementById('carName');
        this.carColor = document.getElementById('carColor');
        this.carRoof = document.getElementById('carRoof');
        this.carTrack = document.getElementById('carTrack');
        this.demoCar = document.getElementById('demo-car');
        this.demoRoof = document.getElementById('demo-roof');
        this.carSettings = document.getElementById('car-settings');
        this.carSettingsBtn = document.getElementById('car-settings-btn');
        this.form = document.getElementById('form');
        this.tbodyRef = document
            .getElementById('myTable')
            .getElementsByTagName('tbody')[0];
        this.bestLaps = document.getElementById('best-laps');
        this.bestLapsBtn = document.getElementById('best-laps-btn');
        this.gameMenu = document.getElementById('game-menu');
        this.main = document.getElementById('main');
        this.startBtn.addEventListener('click', function () {
            _this.toggleMainMenu();
            _this.gameLoop.setGameMode(new Race());
            _this.gameLoop.executeGameMode();
        });
        this.closeBtn.addEventListener('click', function () {
            _this.toggleMainMenu();
        });
        this.closeBtnIn.addEventListener('click', function () {
            _this.toggleSecondMenu();
            _this.carSettings.classList.add('hidden');
            _this.bestLaps.classList.add('hidden');
        });
        this.trackEditorBtn.addEventListener('click', function () {
            _this.toggleMainMenu();
            _this.saveTrackBtn.classList.toggle('hidden');
            _this.gameLoop.setGameMode(new TrackEditor());
            _this.gameLoop.executeGameMode();
        });
        this.saveTrackBtn.addEventListener('click', function () {
            _this.toggleMainMenu();
        });
        this.carSettingsBtn.addEventListener('click', function () {
            _this.toggleSecondMenu();
            _this.carSettings.classList.toggle('hidden');
            _this.carName.value = Storage.getData('CAR_NAME');
            _this.carTrack.value = Storage.getData('COLOR_CAR_TIRE_TRACKS');
            _this.demoCar.style.background = _this.carColor.value =
                Storage.getData('COLOR_CAR_BODY');
            _this.demoRoof.style.background = _this.carRoof.value =
                Storage.getData('COLOR_CAR_ROOF');
        });
        this.form.addEventListener('submit', function (event) {
            event.preventDefault();
            Storage.setData('CAR_NAME', _this.carName.value);
            Storage.setData('COLOR_CAR_TIRE_TRACKS', _this.carTrack.value);
            Storage.setData('COLOR_CAR_BODY', _this.carColor.value);
            Storage.setData('COLOR_CAR_ROOF', _this.carRoof.value);
            _this.demoCar.style.background = _this.carColor.value;
            _this.demoRoof.style.background = _this.carRoof.value;
        });
        this.bestLapsBtn.addEventListener('click', function () {
            _this.toggleSecondMenu();
            _this.bestLaps.classList.toggle('hidden');
            var bestLaps = Storage.getData('BEST_LAPS');
            if (bestLaps) {
                var table = document.getElementById('myTable');
                var rowCount = table.rows.length;
                for (var i = 0; i < rowCount; i++) {
                    table.deleteRow(i);
                }
                bestLaps.forEach(function (lap) {
                    var newRow = _this.tbodyRef.insertRow();
                    var newCell = newRow.insertCell();
                    var newText = document.createTextNode(lap.name);
                    newCell.appendChild(newText);
                    newCell = newRow.insertCell();
                    newText = document.createTextNode(lap.lapTime.toFixed(3));
                    newCell.appendChild(newText);
                });
            }
        });
    }
    Menu.prototype.toggleMainMenu = function () {
        this.gameMenu.classList.toggle('hidden');
        this.closeBtn.classList.toggle('hidden');
        this.closeBtnIn.classList.toggle('hidden');
        this.saveTrackBtn.classList.add('hidden');
    };
    Menu.prototype.toggleSecondMenu = function () {
        this.main.classList.toggle('hidden');
        this.closeBtnIn.classList.toggle('hidden');
    };
    return Menu;
}());
export { Menu };
//# sourceMappingURL=Menu.js.map