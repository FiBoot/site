import { NoiseTest } from './noise-test.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-noise-test',
  templateUrl: './noise-test.component.html',
  styleUrls: ['./noise-test.component.scss'],
})
export class NoiseTestComponent implements AfterViewInit, OnDestroy {
  @ViewChild('noiseTestWrapper') wrapper: ElementRef;
  public app: Canvas;

  ngAfterViewInit(): void {
    this.app = new NoiseTest(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
