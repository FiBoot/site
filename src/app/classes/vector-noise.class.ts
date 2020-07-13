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

  private vectors: Array<Coord>;
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

    this.timer.start();
    this.genereRandomSpacialPoints();
    this.genereNoiseArray();
    this.timer.stop();
    Logger.info(this.timer.toString());
  }

  /**
   * Cube size
   */
  private get cs(): number {
    return this.size / this.density;
  }

  private coordToIndex(x: number, y: number, z: number, d: number = this.density): number {
    return x + y * this.density + z * Math.pow(d, 2);
  }

  private getCubeVectors(cx: number, cy: number, cz: number): [Coord, Coord, Coord, Coord] {
    // a   b
    // | _ |
    // d   c
    return [
      this.vectors[this.coordToIndex(cx, cy, cz, this.density + 1)],
      this.vectors[this.coordToIndex(cx, cy, cz, this.density + 1) + 1],
      this.vectors[this.coordToIndex(cx, cy, cz, this.density + 1) + this.density + 2],
      this.vectors[this.coordToIndex(cx, cy, cz, this.density + 1) + this.density + 1],
    ];
  }

  private getNoiseValue(x: number, y: number, z: number): number {

    this.getCubeVectors(
      Math.floor(x / this.cs),
      Math.floor(y / this.cs),
      Math.floor(z / this.cs)
    );

    return 0;
  }

  private genereRandomVector(size: number): Coord {
    const r = () => Math.random() * (size * 2) - size;
    return new Coord(r(), r(), r()); // TODO: is Z needed?
  }

  private genereRandomSpacialPoints(): void {
    this.vectors = Utils.repeat<Coord>(
      () => this.genereRandomVector(this.cs),
      Math.pow(this.density + 1, 2) * ((this.depth / this.density) + 1)
    );
  }

  private genereNoiseArray(): void {
    this.array = new Array<Array<number>>();
    this.maximumNoise = 0;

    for (let z = 0; z < this.depth; z++) {
      const layer = new Array<number>();
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          const value = this.getNoiseValue(x, y, z);
          this.maximumNoise = value > this.maximumNoise ? value : this.maximumNoise;
          layer.push(value);
        }
      }
      this.array.push(layer);
    }
  }

  val(x: number, y: number, z: number = 0): number {
    const index = x + y * this.size;
    const val = index < Math.pow(this.size, 2) ? this.array[z % this.depth][index] / this.maximumNoise : 0;
    return 1 - val;
  }
}
