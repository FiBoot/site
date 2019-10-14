import { Canvas } from 'src/app/classes/canvas.class';
import { Noise } from 'src/app/classes/noise.class';

export class NoiseTest extends Canvas {
  readonly MAX_ALPHA: number = 255;
  private _noise: Noise;
  private _z: number;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'noise-test', unitsPerLine: 100, maxWidth: 1000, looperOption: { timespan: 10 } });

    this.render.fillStyle = '#fff';
    this.render.font = `${this.us}px`;
    this.render.fillText('Generating Noise..', this.us, this.us * 2);
    // waiting for fillText 100ms
    setTimeout(() => {
      this._noise = new Noise(100, 1000, 5);
      this._z = 0;
      this.start();
    }, 100);
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
