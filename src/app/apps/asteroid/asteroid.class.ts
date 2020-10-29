import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/classes/utils/utils.class';

const RATIO = 400;

enum Color {
  SHIP = '#FAA',
  SHIPLINE = '#A66',
  BG = '#000',
  LINE = '#EEE',
}

class Ship {
  MAXVELOCITY = 5;
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
    this.vec.x = Utils.fixed(Utils.reduce(this.vec.x + vec.x, this.MAXVELOCITY, -this.MAXVELOCITY), 2);
    this.vec.y = Utils.fixed(Utils.reduce(this.vec.y + vec.y, this.MAXVELOCITY, -this.MAXVELOCITY), 2);
  }
}


export class Asteroid extends Canvas {
  private ship: Ship;
  private mousePressed: boolean;
  private mousePos: Coord;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'asteroid', looperOption: { timespan: 30 } });

    this.mousePressed = false;
    this.ship = new Ship(this.size);

    this.start();
  }

  onMouse(pressed: boolean) {
    this.mousePressed = pressed;
  }

  onMouseMove(x: number, y: number): void {
    // set mouse pos
    this.mousePos ? this.mousePos.set(x, y) : this.mousePos = new Coord(x, y);
  }

  // main loop
  loopCB(): void {
    this.clear();
    this.moveShip();
    this.drawShip();
    this.drawVecLine();
    this.drawReactor();
  }

  moveShip(): void {
    if (this.mousePressed) {
      // calc vector
      const vec = new Coord(
        (this.mousePos.x - this.ship.pos.x) / RATIO,
        (this.mousePos.y - this.ship.pos.y) / RATIO,
      );
      this.ship.addVec(vec);
    }
    this.ship.move();
  }

  clear(): void {
    this.render.fillStyle = Color.BG;
    this.render.fillRect(0, 0, this.size, this.size);
  }

  drawShip(): void {
    const radius = 5;
    this.render.fillStyle = Color.SHIP;
    this.render.strokeStyle = Color.SHIPLINE;
    this.render.lineWidth = 1;
    this.render.beginPath();
    this.render.arc(this.ship.pos.x, this.ship.pos.y, radius, 0, 2 * Math.PI);
    this.render.fill();
    this.render.stroke();
  }

  drawVecLine(): void {
    if (this.mousePos) {
      this.render.strokeStyle = Color.LINE;
      this.render.lineWidth = Utils.hypotenuse(this.ship.pos.x, this.ship.pos.y, this.mousePos.x, this.mousePos.y) / RATIO;
      this.render.beginPath();
      this.render.moveTo(this.mousePos.x, this.mousePos.y);
      this.render.lineTo(this.ship.pos.x, this.ship.pos.y);
      this.render.stroke();
    }
  }

  drawReactor(): void {
    if (this.mousePressed) {
      // console.log(
      //   Utils.sign(this.ship.pos.x - this.mousePos.x),
      //   Utils.sign(this.ship.pos.y - this.mousePos.y)
      // )
      const xLenght = Math.abs(this.ship.pos.x - this.mousePos.x);
      const yLenght = Math.abs(this.ship.pos.y - this.mousePos.y);
      const adjacent = Math.abs(xLenght) < Math.abs(yLenght) ? xLenght : yLenght;
      const hypotenuse = Utils.hypotenuse(this.ship.pos.x, this.ship.pos.y, this.mousePos.x, this.mousePos.y);
      const angle = Math.cos(adjacent / hypotenuse) * (Math.PI);

      this.render.beginPath();
      this.render.arc(this.ship.pos.x, this.ship.pos.y, 10, angle, angle + Math.PI / 2);
      this.render.stroke();
    }
  }
}
