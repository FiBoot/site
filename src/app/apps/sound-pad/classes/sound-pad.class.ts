import { Sound } from './sound.class';
import { Subject } from 'rxjs';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/classes/utils/utils.class';
import { Coord } from 'src/app/classes/coord.class';

const COLORS = {
  BACKGROUND: '#888',
  POINT: '#EEE',
};

export class SoundPad extends Canvas {
  private _sound: Sound = new Sound();
  private _mousePos: Coord = new Coord(0, 0);
  public frequency: Subject<number | null> = new Subject();

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'sound-pad', unitsPerLine: 100, looperOption: { timespan: 20 } });

    this.drawBackground();
    this.start();
    this.frequency.subscribe(val => this._sound.setFrequency(val));
  }

  destroy(): void {
    this._sound.destroy();
    this.destroy();
  }

  loopCB(): void {
    const unit = this.convertPointToUnit(this._mousePos);
    this.drawLine(unit.x);
  }

  private drawBackground(color: string = COLORS.BACKGROUND): void {
    this.render.fillStyle = COLORS.BACKGROUND;
    this.render.fillRect(0, 0, this.size, this.size);
  }

  private drawLine(x: number, color: string = COLORS.POINT): void {
    this.render.fillStyle = color;
    this.render.fillRect(x * this.us, 0, this.us, this.size);
  }

  protected onMouse(pressed: boolean, x: number, y: number): void {
    pressed ? this._sound.play() : this._sound.stop();
  }

  protected onMouseMove(x: number, y: number): void {
    const screenXPercent = Utils.fixed((x * 100) / this.size);
    const frequency = this.noteToFrenquency(screenXPercent);
    this.frequency.next(frequency);
  }

  protected onMouseLeave(): void {
    this.frequency.next(null);
  }

  /**
   * Returne the frequency (in hertz) from the n keyboard key
   *
   * @private
   * @param {number} note keyboard key number
   * @returns {number} note in hertz
   * @memberof SoundPad
   */
  private noteToFrenquency(note: number): number {
    return Utils.fixed(Math.pow(2, (note - 49) / 12) * 440, 3);
  }
}
