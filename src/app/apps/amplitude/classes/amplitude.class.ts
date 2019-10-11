import { Canvas } from 'src/app/classes/canvas.class';
import { Noise } from 'src/app/classes/noise.class';

const DEFAULT_SIZE = 100;

export class Amplitude extends Canvas {
  readonly MAX_ALPHA: number = 255;
  private _noise: Noise;
  private _z: number;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'amplitude', unitsPerLine: DEFAULT_SIZE, maxWidth: 1000, looperOption: { timespan: 100 } });

    this._noise = new Noise(DEFAULT_SIZE, 100, 10);
    this._z = 0;
    this.start();
  }

  noiseToColor(noise: number): string {
    const alpha = this.MAX_ALPHA - Math.round(this.MAX_ALPHA * noise);
    return `rgb(${alpha},${alpha},${alpha})`;
  }

  loopCB(): void {
    this.clear();
    for (let y = 0; y < this.upl; y++) {
      for (let x = 0; x < this.upl; x++) {
        const noise = this._noise.val(x, y, this._z);
        const color = this.noiseToColor(noise);
        this.drawUnit(x, y, color);
      }
    }
    this._z += 1;
  }
}
