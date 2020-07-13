import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';

const SIZE = 100;
const BOID_NUMBER = 20;
const DEFAULT_MAX_SPEED = 2;

class Boid {
  public position: Coord;
  public vector: Coord;

  constructor(public maxSize: number) {
    const rp = n => Math.random() * n;
    const rv = n => (Math.random() * n * 2) - n;
    this.position = new Coord(rp(this.maxSize), rp(this.maxSize), rp(this.maxSize));
    this.vector = new Coord(rv(DEFAULT_MAX_SPEED), rv(DEFAULT_MAX_SPEED), rv(DEFAULT_MAX_SPEED));
  }

  private isOutOfBorder(p: number, v: number): boolean {
    return p + v < 0 || p + v > this.maxSize;
  }

  update(): void {
    // toudroi
    this.vector.x *= this.isOutOfBorder(this.position.x, this.vector.x) ? -1 : 1;
    this.vector.y *= this.isOutOfBorder(this.position.y, this.vector.y) ? -1 : 1;
    this.vector.z *= this.isOutOfBorder(this.position.z, this.vector.z) ? -1 : 1;
    this.position.x += this.vector.x;
    this.position.y += this.vector.y;
    this.position.z += this.vector.z;
  }
}


export class Boids extends Canvas {
  boids: Array<Boid>;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'boids', maxWidth: 800 });
    this.boids = new Array<Boid>();

    this.init();
    this.start();
  }

  init(): void {
    for (let i = BOID_NUMBER; i > 0; i--) {
      this.boids.push(new Boid(SIZE));
    }
  }

  loopCB(): void {
    const t = (n: number) => n * this.size / 100;

    this.clear();
    this.render.fillStyle = 'white';

    this.boids.forEach(boid => {
      // update
      boid.update();

      // draw
      const r = 2 - ((boid.position.z / SIZE) * 2);
      this.render.beginPath();
      this.render.arc(t(boid.position.x), t(boid.position.y), t(r), 0, Math.PI * 2);
      this.render.fill();
    });
  }

}
