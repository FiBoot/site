import { Canvas } from 'src/app/classes/canvas.class';
import { Noise } from 'src/app/classes/noise.class';
import { VectorNoise } from 'src/app/classes/vector-noise.class';

const SIZE = 100;

export class NoiseTest extends Canvas {
  readonly MAX_ALPHA: number = 255;
  private noise: VectorNoise;
  private z: number;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'noise-test', unitsPerLine: SIZE, maxWidth: 1000, looperOption: { timespan: 10 } });

    this.render.fillStyle = '#fff';
    this.render.font = `${this.us}px`;
    this.render.fillText('Generating Noise..', this.us, this.us * 2);
    // waiting for fillText 100ms
    setTimeout(() => {
      this.noise = new VectorNoise(SIZE, 100, 5);
      this.z = 0;
      this.start();
    }, 100);
  }

  noiseToColor(noise: number): string {
    const alpha = Math.round(this.MAX_ALPHA * noise);
    return `rgb(${alpha},${alpha},${alpha})`;
  }

  loopCB(): void {
    this.clear();
    for (let y = 0; y < this.upl; y++) {
      for (let x = 0; x < this.upl; x++) {
        const noise = this.noise.val(x, y, this.z);
        const color = this.noiseToColor(noise);
        this.drawUnit(x, y, color);
      }
    }
    this.z += 1;
  }
}
