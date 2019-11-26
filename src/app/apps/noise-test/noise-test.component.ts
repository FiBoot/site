import { NoiseTest } from './noise-test.class';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-noise-test',
  templateUrl: './noise-test.component.html',
  styleUrls: ['./noise-test.component.scss']
})
export class NoiseTestComponent {
  @ViewChild('noiseTestWrapper') wrapper: ElementRef;
  public app: Canvas;

  constructor() {
    setTimeout(() => {
      this.app = new NoiseTest(this.wrapper.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.app.destory();
  }
}
