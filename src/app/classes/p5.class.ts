import * as p5 from 'p5';

export class P5 {
  private _p5: p5;
  private _sketch = p => {
    p.draw = _ => {
      this.draw(p);
    };
    p.setup = _ => {
      this.setup(p);
    };
  }

  constructor() {
    this._p5 = new p5(this._sketch);
  }

  protected setup(p5: p5): void {}
  protected draw(p5: p5): void {}
}
