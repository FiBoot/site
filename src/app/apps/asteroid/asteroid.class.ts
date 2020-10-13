import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/classes/utils/utils.class';

enum Color {
  SHIP = '#FAF',
  BG = '#000',
  LINE = '#AAA',
}

class Ship {
  MAXVELOCITY: number = 10;
  pos: Coord;
  vec: Coord;

  constructor(canvasSize: number) {
    this.pos = new Coord(canvasSize / 2, canvasSize / 2);
    this.vec = new Coord(0, 0);
  }

  move(): void {
    this.pos.x += this.vec.x;
    this.pos.y += this.vec.y;
  }

  addVec(vec: Coord): void {
    this.vec.x = Utils.reduce(this.vec.x + vec.x, this.MAXVELOCITY, -this.MAXVELOCITY);
    this.vec.y = Utils.reduce(this.vec.y + vec.y, this.MAXVELOCITY, -this.MAXVELOCITY);
  }
}


export class Asteroid extends Canvas {
  private ship: Ship;
  private mousePressed: boolean;
  private mousePos: Coord;
  private vec: Coord;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'asteroid', looperOption: { timespan: 30 } });

    this.mousePressed = false;
    this.ship = new Ship(this.size);
    this.vec = new Coord(0, 0);

    this.start();
  }

  onMouse(pressed: boolean) {
    this.mousePressed = pressed;
  }

  onMouseMove(x: number, y: number): void {
    // set mouse pos
    this.mousePos ? this.mousePos.set(x, y) : this.mousePos = new Coord(x, y);
    // calc vector
    this.vec.set(
      (x - this.ship.pos.x) / 100,
      (y - this.ship.pos.y) / 100
    );
  }

  // main loop
  loopCB(): void {
    this.clear();
    this.moveShip();
    this.drawShip();
    this.drawVecLine();
  }

  moveShip(): void {
    if (this.mousePressed) {
      this.ship.addVec(this.vec);
    }
    this.ship.move();
  }

  drawShip(): void {
    const radius = 5;
    this.render.strokeStyle = Color.SHIP;
    this.render.lineWidth = 2;
    this.render.beginPath();
    this.render.arc(this.ship.pos.x, this.ship.pos.y, radius, 0, 2 * Math.PI);
    this.render.stroke();
  }

  clear(): void {
    this.render.fillStyle = Color.BG;
    this.render.fillRect(0, 0, this.size, this.size);
  }

  drawVecLine(): void {
    if (this.mousePos) {
      this.render.strokeStyle = Color.LINE;
      this.render.lineWidth = 1;
      this.render.beginPath();
      this.render.moveTo(this.mousePos.x, this.mousePos.y);
      this.render.lineTo(this.ship.pos.x, this.ship.pos.y);
      this.render.stroke();
    }
  }
}
