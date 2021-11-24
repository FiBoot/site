import { Canvas } from 'src/app/classes/canvas.class';
import { SphereNoise } from 'src/app/classes/sphere-noise.class';
import { Utils } from 'src/app/classes/utils/utils.class';

export class ArchitectsLogo extends Canvas {
  readonly CIRCLE_SIZE_RATIO: number = 1 / 5;
  readonly MAX_ALPHA: number = 255;

  private openSimplex: SphereNoise = new SphereNoise(100, 500, 10);
  private zNoiseOffset = 0;

  public noiseRatio = 6;
  public terraformThreshold = 3;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'architects-logo', unitsPerLine: 100 });

    this.start();
  }

  noise(x: number, y: number, z: number): number {
    // transforming [-1, 1] interval to [0, 1]
    return (this.openSimplex.get(x, y, z) + 1) / 2;
  }

  genereArchitectsNoise(x: number, y: number): number {
    const noiseRatio = 1 / this.noiseRatio;
    const terrainRatio = 1 - noiseRatio;

    const noise = this.noise(x, y, this.zNoiseOffset);
    const centerDistanceRatio = Utils.hypotenuse(x, y, this.upl / 2, this.upl / 2) / this.upl;

    const result = noise * noiseRatio + centerDistanceRatio * terrainRatio;
    return result - ((result * 100) % this.terraformThreshold) / 100;
  }

  noiseToColor(noise: number): string {
    const alpha = this.MAX_ALPHA - Math.round(this.MAX_ALPHA * noise);
    return `rgb(${alpha},${alpha},${alpha})`;
  }

  drawCircle(): void {
    this.render.beginPath();
    this.render.lineWidth = this.size / 100;
    this.render.fillStyle = '#111';
    this.render.arc(this.hs, this.hs, this.size * this.CIRCLE_SIZE_RATIO, 0, 2 * Math.PI);
    this.render.fill();
  }

  override loopCB(): void {
    this.clear();
    for (let x = 0; x < this.upl; x++) {
      for (let y = 0; y < this.upl; y++) {
        const noise = this.genereArchitectsNoise(x, y);
        const color = this.noiseToColor(noise);
        this.drawUnit(x, y, color);
      }
      this.zNoiseOffset += 1;
    }
    // feature flip?
    // this.drawCircle();
  }
}
