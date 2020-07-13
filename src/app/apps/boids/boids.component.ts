import { Boids } from './boids.class';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-boids',
  templateUrl: './boids.component.html',
  styleUrls: ['./boids.component.scss']
})
export class BoidsComponent implements OnDestroy {

  @ViewChild('boidsWrapper') wrapper: ElementRef;
  public app: Canvas;

  constructor() {
    setTimeout(() => {
      this.app = new Boids(this.wrapper.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.app.destory();
  }
}
