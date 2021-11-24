import { Canvas } from 'src/app/classes/canvas.class';
import { PerlinNoise2d } from 'src/app/classes/perlin-noise-2d.class';
import { Utils } from 'src/app/classes/utils/utils.class';

const SIZE = 100;
const DEPTH = 1;

export class NoiseTest extends Canvas {
  readonly MAX_ALPHA: number = 2**8;
  private noise: PerlinNoise2d;
  private z: number;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'noise-test', unitsPerLine: SIZE, maxWidth: 600, looperOption: { timespan: 100 } });

    this.noise = new PerlinNoise2d(SIZE);
    this.z = 0;
    
    this.render.fillStyle = '#fff';
    this.render.font = `${this.us}px`;
    this.render.fillText('Generating Noise..', this.us, this.us * 2);
    
    // waiting for fillText 100ms
    setTimeout(() => {
      this.noise.generate();
      this.start();
    }, 100);
  }

  noiseToColor(noise: number): string {
    const alpha = Math.round(this.MAX_ALPHA * noise);
    return `rgb(${alpha},${alpha},${alpha})`;
  }

  override loopCB(): void {
    this.clear();
    for (let y = 0; y < this.upl; y++) {
      for (let x = 0; x < this.upl; x++) {
        const noise = this.noise.get(x, y);
        const color = this.noiseToColor(noise);
        this.drawUnit(x, y, color);
      }
    }
    this.z += 1;
  }
}
