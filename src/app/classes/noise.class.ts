import { Coord } from './coord.class';
import { Logger } from './logger.class';
import { Timer } from './timer.class';
import { Utils } from './utils/utils.class';

const jsExecutionTime = 0.000000005;

const DEFAULT_NOISE_SIZE = 100;
const DEFAULT_NOISE_DEPTH = 10;
const DEFAULT_POINT_DENSITY = 10;

export class Noise {
  private _timer: Timer = new Timer('Noise');
  private _size: number;
  private _depth: number;
  private _density: number;

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

    Logger.info(`[Noise] generating noise array [${size}x${size}x${depth}] (density: ${density})`);
    const loopCount = Math.pow(this._size, 2) * this._depth * Math.pow(this._density, 3);
    const OptimizedLoopCount = Math.pow(this._size, 2) * this._depth * 27;
    Logger.info(
      `[Noise] estimated loop count: ${loopCount} (non-optimized :<), estimated time: ${loopCount * jsExecutionTime}sec`
      +`\nCould be ${OptimizedLoopCount}, time: ${OptimizedLoopCount * jsExecutionTime}sec`
    );

    this.genereNoiseArray();
  }

  private genereNoiseArray(): void {
    this._timer.start();
    const points = this.genereRandomSpacialPoints();
    this._array = new Array<Array<number>>();
    this._maximumNoise = 0;

    console.warn(points);

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

  val(x: number, y: number, z: number = 0): number {
    const index = x + y * this._size;
    return index < Math.pow(this._size, 2) ? this._array[z % this._depth][index] / this._maximumNoise : 0;
  }
}
