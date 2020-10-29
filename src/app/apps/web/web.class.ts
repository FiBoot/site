import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/classes/utils/utils.class';

const MAX_VELOCITY = 2;
const MAX_POINT_SIZE = 2;
const MAX_LINE_SIZE = 150;

enum COLORS {
  DOT = '#EE9',
  LINE = '#AFF'
}

class Dot {
  size: number;
  pos: Coord;
  vec: Coord;
  ttl = 0;

  constructor(size: number) {
    // this.size = Utils.random(MAX_POINT_SIZE) + 1;
    this.size = MAX_POINT_SIZE;
    this.pos = new Coord(Utils.random(size), Utils.random(size));
    this.vec = new Coord(
      (Utils.random(MAX_VELOCITY) + 1) * (Utils.random(2) ? 1 : -1),
      (Utils.random(MAX_VELOCITY) + 1) * (Utils.random(2) ? 1 : -1),
    );
  }

  move(): void {
    this.pos.x += this.vec.x;
    this.pos.y += this.vec.y;
    this.ttl += 1;
  }
}

export class Web extends Canvas {
  private dots: Array<Dot> = new Array<Dot>();
  private mouseDot: Dot;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'web', looperOption: { timespan: 30 } });

    this.genereDot(50);

    this.start();
  }

  genereDot(n: number = 1): void {
    for (; n > 0; n--) {
      this.dots.push(new Dot(this.size));
    }
  }

  onMouseMove(x: number, y: number): void {
    if (!this.mouseDot) {
      this.mouseDot = new Dot(this.size);
    }
    this.mouseDot.pos.x = x;
    this.mouseDot.pos.y = y;
  }

  loopCB(): void {
    this.clear();
    this.dots.forEach((itDot: Dot, index: number) => {
      itDot.move();
      this.removeDotOutBounds(itDot, index);
      this.drawDot(itDot);
    });
    this.dots.forEach(this.drawLines.bind(this));
    if (this.mouseDot) {
      this.drawDot(this.mouseDot);
    }
  }

  removeDotOutBounds(dot: Dot, index: number): void {
    if (dot.pos.x < 0 || dot.pos.x > this.size
      || dot.pos.y < 0 || dot.pos.y > this.size) {
      this.dots.splice(index, 1);
      this.genereDot();
    }
  }

  drawDot(dot: Dot): void {
    this.render.fillStyle = COLORS.DOT;
    this.render.beginPath();
    this.render.arc(dot.pos.x, dot.pos.y, dot.size, 0, Math.PI * 2);
    this.render.fill();
  }

  drawLines(dot: Dot): void {
    this.dots.forEach((itDot: Dot) => this.drawLine(dot, itDot));
    if (this.mouseDot) {
      this.drawLine(dot, this.mouseDot);
    }
  }

  drawLine(dot1, dot2): void {
    const dist = Utils.hypotenuse(dot1.pos.x, dot1.pos.y, dot2.pos.x, dot2.pos.y);
    if (dist < MAX_LINE_SIZE) {
      this.render.strokeStyle = COLORS.LINE;
      this.render.lineWidth = (1 - (dist / MAX_LINE_SIZE)) * (MAX_POINT_SIZE / 2);
      this.render.beginPath();
      this.render.moveTo(dot1.pos.x, dot1.pos.y);
      this.render.lineTo(dot2.pos.x, dot2.pos.y);
      this.render.stroke();
    }
  }

}
