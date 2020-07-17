import { Canvas } from 'src/app/classes/canvas.class';
import { Sound } from './sound.class';
import { Utils } from 'src/app/classes/utils/utils.class';

export class SoundPad extends Canvas {
  private _sound: Sound;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'sound-pad' });
    this._sound = new Sound();

    this.render.fillStyle = '#888';
    this.render.rect(0, 0, this.size, this.size);
    this.render.fill();
  }

  destroy(): void {
    this._sound.destroy();
    this.destory();
  }

  protected onMouse(pressed: boolean, x: number, y: number): void {
    pressed ? this._sound.play() : this._sound.stop();
  }

  protected onMouseMove(x: number, y: number): void {
    const screenXPercent = (x * 100 / this.size);
    const frequency = this.getFrequency(screenXPercent);
    this._sound.setFrequency(frequency);
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
