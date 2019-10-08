import { P5 } from 'src/app/classes/p5.class';

export class Amplitude extends P5 {
  constructor() {
    super();
  }

  draw(p5): void {
      p5.circle(30,30,20)
  }
}
