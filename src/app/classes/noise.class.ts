import { Coord } from './coord.class';
import { Logger } from './logger.class';
import { Utils } from './utils/utils.class';

const DEFAULT_SIZE = 100;
const DEFAULT_DEPTH = 200;
const DEFAULT_VARIATION = 0.1;
const DEFAULT_PRECISION = 100;

export class Noise {
  private _array: Array<Array<number>>;

  constructor(
    private _size: number = DEFAULT_SIZE,
    private _depth: number = DEFAULT_DEPTH,
    private _variation: number = DEFAULT_VARIATION,
    private _precision: number = DEFAULT_PRECISION
  ) {
    Logger.info(`[Noise] generating noise array [${this._size}x${this._size}x${this._depth}]...`);
    this._array = new Array<Array<number>>();
    this.genereNoiseArray();
    Logger.info(`[Noise] Done`);
  }

  private getAmbiantNoiseValues(coord: Coord, layer: Array<number>): Array<number> {
    const values: Array<number> = new Array<number>();
    // left value
    if (coord.x > 0) {
      values.push(layer[coord.x - 1 + coord.y * this._size]);
    }
    // up value
    if (coord.y > 0) {
      values.push(layer[coord.x + (coord.y - 1) * this._size]);
    }
    // z - 1 value
    if (coord.z > 0) {
      values.push(this._array[coord.z - 1][coord.x + coord.y * this._size]);
    }
    // z + 1 value
    if (coord.z === this._depth - 1) {
      values.push(this._array[0][coord.x + coord.y * this._size]);
    }
    return values;
  }

  private generateAmbiantNoise(coord: Coord, layer: Array<number>): number {
    const ambiantValues = this.getAmbiantNoiseValues(coord, layer);
    const averageValue = ambiantValues.length ? ambiantValues.reduce((a, b) => a + b) / ambiantValues.length : 0;
    const averageValueRounded = Math.round(averageValue * this._precision) / this._precision;
    const noise = Utils.random(this._variation * this._precision) / this._precision;
    const sign = Utils.random(2) ? 1 : -1;
    return Utils.reduce(averageValueRounded + noise * sign, 1, 0);
  }

  private genereNoiseArray(): void {
    for (let z = 0; z < this._depth; z++) {
      const layer = new Array<number>();
      for (let i = 0; i < Math.pow(this._size, 2); i++) {
        const x = i % this._size;
        const y = Math.floor(i / this._size);
        layer[i] = this.generateAmbiantNoise(new Coord(x, y, z), layer);
      }
      this._array.push(layer);
    }
    console.log(this._array);
  }

  public val(x: number, y: number, z: number): number {
    return this._array[z % this._depth][x + y * this._size];
  }
}
