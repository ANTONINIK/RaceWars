import { Track } from '../models/Track'

export abstract class TrackCommand {
  receiver: Track
  abstract execute(event: MouseEvent): void
  constructor(track: Track) {
    this.receiver = track
  }
}

export class CapturePointCommand extends TrackCommand {
  constructor(track: Track) {
    super(track)
  }
  execute(event: MouseEvent) {
    this.receiver.capturePoint(event)
  }
}

export class MovePointCommand extends TrackCommand {
  constructor(track: Track) {
    super(track)
  }
  execute(event: MouseEvent) {
    this.receiver.movePoint(event)
  }
}

export class ReleasePointCommand extends TrackCommand {
  constructor(track: Track) {
    super(track)
  }
  execute(event: MouseEvent) {
    this.receiver.releasePoint(event)
  }
}
