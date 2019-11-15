import { Coord } from './coord.class';
import { Logger } from './logger.class';
import { Timer } from './timer.class';
import { Utils } from './utils/utils.class';

const DEFAULT_NOISE_SIZE = 100;
const DEFAULT_NOISE_DEPTH = 10;
const DEFAULT_POINT_DENSITY = 10;

export class VectorNoise {
  private size: number;
  private depth: number;
  private density: number;

  private timer: Timer = new Timer('Noise');

  private array: Array<Array<number>>;
  private maximumNoise: number;


  /**
   * Creates an instance of VectorNoise.
   * @param {number} [size=DEFAULT_NOISE_SIZE] square size in pixel |_|
   * @param {number} [depth=DEFAULT_NOISE_DEPTH] depth of the noise figure |_|/
   * @param {number} [density=DEFAULT_POINT_DENSITY] density of generation |·|
   */
  constructor(
    size: number = DEFAULT_NOISE_SIZE,
    depth: number = DEFAULT_NOISE_DEPTH,
    density: number = DEFAULT_POINT_DENSITY
  ) {
    this.size = size;
    this.depth = depth;
    this.density = density;

    Logger.info(
      `[Noise] generating noise array [${this.size}x${this.size}x${this.depth}] (density: ${this.density})`
    );
    this.genereNoiseArray();
  }

  private coordToIndex(x: number, y: number, z: number): number {
    return x + y * this.density + z * Math.pow(this.density, 2);
  }

  private getNoiseValue(x: number, y: number, z: number, points: Array<Coord>): number {
    const cubeSize = this.size / this.density;
    return 0;
  }

  private genereRandomVector(size: number): Coord {
    const r = () => Math.random() * (size * 2) - size;
    return new Coord(r(), r(), r());
  }

  private genereRandomSpacialPoints(): Array<Coord> {
    const cubeSize = this.size / this.density;
    return Utils.repeat(
      () => this.genereRandomVector(cubeSize),
      Math.pow(this.density + 1, 2) * ((this.depth / this.density) + 1)
      // Math.pow(this.density + 1, 3) // density+1³
    );
  }

  private genereNoiseArray(): void {
    this.timer.start();
    const points = this.genereRandomSpacialPoints();
    this.array = new Array<Array<number>>();
    this.maximumNoise = 0;

    console.warn(points);

    for (let z = 0; z < this.depth; z++) {
      // const z = Math.round((z / this.depth) * this.size);
      const layer = new Array<number>();
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          const value = this.getNoiseValue(x, y, z, points);
          this.maximumNoise = value > this.maximumNoise ? value : this.maximumNoise;
          layer.push(value);
        }
      }
      this.array.push(layer);
    }

    this.timer.stop();
    Logger.info(this.timer.toString());
  }

  val(x: number, y: number, z: number = 0): number {
    const index = x + y * this.size;
    const val = index < Math.pow(this.size, 2) ? this.array[z % this.depth][index] / this.maximumNoise : 0;
    return 1 - val;
  }
}
