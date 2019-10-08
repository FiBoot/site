import { Coord } from './coord.class';
import { Utils } from './utils/utils.class';

const DEFAULT_NOISE_SIZE = 100;
const DEFAULT_NOISE_DEPTH = 10;
const DEFAULT_POINT_DENSITY = 10;

export class Noise {
  private _size: number;
  private _depth: number;
  private _density: number;

  private _array: Array<Array<number>>;

  constructor(
    size: number = DEFAULT_NOISE_SIZE,
    depth: number = DEFAULT_NOISE_DEPTH,
    density: number = DEFAULT_POINT_DENSITY
  ) {
    this._size = size;
    this._depth = depth;
    this._density = density;
    this.genereNoiseArray();
  }

  private genereNoiseArray(): void {
    const points = this.genereRandomSpacialPoints();
    this._array = new Array<Array<number>>();

    console.log(points);

    for (let d = 0; d < this._depth; d++) {
      const layer = new Array<number>();
      const z = (d / this._depth) * this._size;
      for (let y = 0; y < this._size; y++) {
        for (let x = 0; x < this._size; x++) {
          const value = this.getNoiseValue(x, y, z, points);
          layer.push(value / this._size); // this will be incorrect
        }
      }
      this._array.push(layer);
    }
    console.warn(this._array)
  }

  private getNoiseValue(x: number, y: number, z: number, points: Array<Coord>): number {
    let val = -1;
    for (let i = 0; i < points.length; i++) {
      const dist = Utils.hypotenuse3d(x, y, z, points[i].x, points[i].y, points[i].z);
      if (val < 0 || dist < val) {
        val = dist;
      }
    }
    return val;
  }

  private genereRandomSpacialPoints(): Array<Coord> {
    const r = () => Math.random() * this._size;
    return Utils.repeat(() => new Coord(r(), r(), r()), this._density);
  }

  val(x: number, y: number, z: number = 0): number {
    const index = x + y * this._size;
    return index < Math.pow(this._size, 2) && z < this._depth ? this._array[z][index] : 0;
  }
}
