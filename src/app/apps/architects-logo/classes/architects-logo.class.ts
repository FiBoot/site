import OpenSimplexNoise from 'open-simplex-noise';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';

export class ArchitectsLogo extends Canvas {
  readonly CIRCLE_SIZE_RATIO: number = 1 / 5;
  readonly MAX_ALPHA: number = 255;

  private openSimplex: OpenSimplexNoise = new OpenSimplexNoise(0);
  private zNoiseOffset = 0;

  public noiseRatio = 6;
  public terraformThreshold = 3;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, maxWidth: 1000, unitsPerLine: 100, playerOption: { timespan: 100 } });

    this.start();
  }

  noise(x: number, y: number, z: number): number {
    // transforming [-1, 1] interval to [0, 1]
    return (this.openSimplex.noise3D(x / 10, y / 10, z / 1000) + 1) / 2;
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

  drawUnit(x: number, y: number): void {
    const noise = this.genereArchitectsNoise(x, y);
    this.render.fillStyle = this.noiseToColor(noise);
    this.render.fillRect(Math.floor(x * this.us), Math.floor(y * this.us), Math.ceil(this.us), Math.ceil(this.us));
  }

  drawCircle(): void {
    this.render.beginPath();
    this.render.lineWidth = this.size / 100;
    this.render.fillStyle = '#111';
    this.render.arc(this.hs, this.hs, this.size * this.CIRCLE_SIZE_RATIO, 0, 2 * Math.PI);
    this.render.fill();
  }

  loopCB(): void {
    this.clear();
    for (let x = 0; x < this.upl; x++) {
      for (let y = 0; y < this.upl; y++) {
        this.drawUnit(x, y);
      }
      this.zNoiseOffset += 1;
    }
    this.drawCircle();
  }
}
