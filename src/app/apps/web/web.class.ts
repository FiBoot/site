import { Canvas } from 'src/app/classes/canvas.class';
import { Coord } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/classes/utils/utils.class';

const MAX_VELOCITY = 4;
enum COLORS {
  DOT = '#EEE',
  LINE = '#FFF'
}

class Dot {
  pos: Coord;
  vec: Coord;

  constructor(size: number) {
    this.pos = new Coord(Utils.random(size), Utils.random(size));
    this.vec = new Coord(
      (Utils.random(MAX_VELOCITY) + 1) * (Utils.random(2) ? 1 : -1),
      (Utils.random(MAX_VELOCITY) + 1) * (Utils.random(2) ? 1 : -1),
    );
  }

  move(): void {
    this.pos.x += this.vec.x;
    this.pos.y += this.vec.y;
  }
}

export class Web extends Canvas {
  private dots: Array<Dot> = new Array<Dot>();

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'web', looperOption: { timespan: 50 } });

    this.genereDot(50);

    this.start();
  }

  genereDot(n: number = 1): void {
    for (; n > 0; n--) {
      this.dots.push(new Dot(this.size));
    }
  }

  loopCB(): void {
    this.clear();
    this.dots.forEach((dot: Dot, index: number) => {
      dot.move();
      this.removeDotOutBounds(dot, index);
      this.drawDot(dot);
    });
  }

  drawDot(dot: Dot): void {
    this.render.fillStyle = COLORS.DOT;
    this.render.beginPath();
    this.render.arc(dot.pos.x, dot.pos.y, 1, 0, Math.PI * 2)
    this.render.fill();
  }

  removeDotOutBounds(dot: Dot, index: number): void {
    if (dot.pos.x < 0 || dot.pos.x > this.size
      || dot.pos.y < 0 || dot.pos.y > this.size) {
      console.log(`remove dot#${index} (${this.dots.length})`, dot)
      this.dots.splice(index, 1);
      this.genereDot();
    }
  }

}
