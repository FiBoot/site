export class Coord {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor(x: number, y: number, z: number = null) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  set2DCoord(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  set3DCoord(x: number, y: number, z: number) {
    this.set2DCoord(x, y);
    this._z = z;
  }

  set x(x: number) {
    this._x = x;
  }
  set y(y: number) {
    this._y = y;
  }
  set z(z: number) {
    this._z = z;
  }

  get x(): number {
    return this._x;
  }
  get y(): number {
    return this._y;
  }
  get z(): number {
    return this._z;
  }

  toString(): string {
    return `${this.x}, ${this.y}${this._z !== null ? `, ${this._z}` : ''}`;
  }
}
