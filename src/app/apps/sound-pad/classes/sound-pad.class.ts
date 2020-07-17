import { Canvas } from 'src/app/classes/canvas.class';
import { Sound } from './sound.class';
import { Utils } from 'src/app/classes/utils/utils.class';
import { Coord } from 'src/app/classes/coord.class';

const COLORS = {
  BACKGROUND: '#888',
  POINT: '#EEE',
};

export class SoundPad extends Canvas {
  private _sound: Sound = new Sound();

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'sound-pad', looperOption: { timespan: 10 } });

    this.render.fillStyle = COLORS.BACKGROUND;
    this.render.rect(0, 0, this.size, this.size);
    this.render.fill();

    this.start();
  }

  destroy(): void {
    this._sound.destroy();
    this.destory();
  }

  loopCB(): void {}

  protected onMouse(pressed: boolean, x: number, y: number): void {
    pressed ? this._sound.play() : this._sound.stop();
  }

  protected onMouseMove(x: number, y: number): void {
    const screenXPercent = Utils.fixed((x * 100) / this.size);
    const frequency = this.getFrequency(screenXPercent);
    // set frequency
    this._sound.setFrequency(frequency);
  }

  /**
   * Draw point in given coord
   *
   * @private
   * @param {Coord} coord given coord
   * @param {string} color given color
   * @memberof SoundPad
   */
  private drawPoint(point: Coord, color: string): void {
    const radius = 1; // TODO ?
    this.render.fillStyle = color;
    this.render.beginPath();
    this.render.arc(point.x, point.y, radius, 0, Math.PI * 2);
    this.render.fill();
  }

  /**
   * Returne the frequency (in hertz) from the n keyboard key
   *
   * @private
   * @param {number} note keyboard key number
   * @returns {number} note in hertz
   * @memberof SoundPad
   */
  private getFrequency(note: number): number {
    return Utils.fixed(Math.pow(2, (note - 49) / 12) * 440, 3);
  }
}
