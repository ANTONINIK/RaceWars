import { Track } from "../models/Track"
import { ICommand } from "./ICommand"

export class CapturePointCommand implements ICommand {
  execute(track: Track, event: MouseEvent) {
    track.capturePoint(event)
  }
}

export class MovePointCommand implements ICommand {
  execute(track: Track, event: MouseEvent) {
    track.movePoint(event)
  }
}
