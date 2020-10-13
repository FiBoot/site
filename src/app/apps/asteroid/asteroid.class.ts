import { Canvas } from 'src/app/classes/canvas.class';

export class Asteroid extends Canvas {

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'asteroid' });
  }
}
