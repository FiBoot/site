import { Coord } from './coord.class';
import { Logger } from './logger.class';
import { Timer } from './timer.class';
import { Utils } from './utils/utils.class';

const DEFAULT_NOISE_SIZE = 100;
const DEFAULT_NOISE_DEPTH = 10;
const DEFAULT_POINT_DENSITY = 10;

export class Noise {
  private _size: number;
  private _depth: number;
  private _density: number;

  private _timer: Timer = new Timer('Noise');

  private _array: Array<Array<number>>;
  private _maximumNoise: number;

  constructor(
    size: number = DEFAULT_NOISE_SIZE,
    depth: number = DEFAULT_NOISE_DEPTH,
    density: number = DEFAULT_POINT_DENSITY
  ) {
    this._size = size;
    this._depth = depth;
    this._density = density;

    Logger.info(
      `[Noise] generating noise array [${this._size}x${this._size}x${this._depth}] (density: ${this._density})`
    );
    this.genereNoiseArray();
  }

  private coordToIndex(x: number, y: number, z: number): number {
    return x + y * this._density + z * Math.pow(this._density, 2);
  }

  private getPoint(x: number, y: number, z: number, points: Array<Coord>): Coord {
    return x >= 0 && x < this._density && y >= 0 && y < this._density ? points[this.coordToIndex(x, y, z)] : null;
  }

  private getZSlicePoints(x: number, y: number, z: number, points: Array<Coord>): Array<Coord> {
    return [
      // top line
      this.getPoint(x - 1, y - 1, z, points),
      this.getPoint(x, y - 1, z, points),
      this.getPoint(x + 1, y - 1, z, points),
      // middle line
      this.getPoint(x - 1, y, z, points),
      this.getPoint(x, y, z, points),
      this.getPoint(x + 1, y, z, points),
      // bottom line
      this.getPoint(x - 1, y + 1, z, points),
      this.getPoint(x, y + 1, z, points),
      this.getPoint(x + 1, y + 1, z, points)
    ].filter(a => a);
  }

  private getAdjacentPoints(c: Coord, points: Array<Coord>): Array<Coord> {
    return [
      ...this.getZSlicePoints(c.x, c.y, c.z - 1, points),
      ...this.getZSlicePoints(c.x, c.y, c.z, points),
      ...this.getZSlicePoints(c.x, c.y, c.z + 1, points)
    ];
  }

  private getNoiseValue(x: number, y: number, z: number, points: Array<Coord>): number {
    const cubeUnit = this._size / this._density;
    const cube = new Coord(Math.floor(x / cubeUnit), Math.floor(y / cubeUnit), Math.floor(z / cubeUnit));
    // only if density is enought, we calculate adjacent points
    const adjacentPoints = this._density > 2 ? this.getAdjacentPoints(cube, points) : points;

    let val = -1;
    adjacentPoints.forEach(p => {
      const dist = Utils.hypotenuse3d(x, y, z, p.x, p.y, p.z);
      val = val < 0 || dist < val ? dist : val;
    });
    return val;
  }

  private genereRandomSpacialPoints(): Array<Coord> {
    const cubeUnit = this._size / this._density;
    const points = new Array<Coord>();
    for (let z = 0; z < this._density; z++) {
      for (let y = 0; y < this._density; y++) {
        for (let x = 0; x < this._density; x++) {
          points.push(
            new Coord(
              Math.random() * cubeUnit + x * cubeUnit,
              Math.random() * cubeUnit + y * cubeUnit,
              Math.random() * cubeUnit + z * cubeUnit
            )
          );
        }
      }
    }
    return points;
  }

  private genereNoiseArray(): void {
    this._timer.start();
    const points = this.genereRandomSpacialPoints();
    this._array = new Array<Array<number>>();
    this._maximumNoise = 0;

    for (let d = 0; d < this._depth; d++) {
      const layer = new Array<number>();
      const z = (d / this._depth) * this._size;
      for (let y = 0; y < this._size; y++) {
        for (let x = 0; x < this._size; x++) {
          const value = this.getNoiseValue(x, y, z, points);
          this._maximumNoise = value > this._maximumNoise ? value : this._maximumNoise;
          layer.push(value);
        }
      }
      this._array.push(layer);
    }
    this._timer.stop();
    Logger.info(this._timer.toString());
  }

  val(x: number, y: number, z: number = 0): number {
    const index = x + y * this._size;
    return index < Math.pow(this._size, 2) ? this._array[z % this._depth][index] / this._maximumNoise : 0;
  }
}
