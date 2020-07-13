export class Coord {
  constructor(public x: number, public y: number, public z: number = null) { }

  set(x: number, y: number, z = this.z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString(): string {
    return `${this.x}, ${this.y}${this.z !== null ? `, ${this.z}` : ''}`;
  }
}
