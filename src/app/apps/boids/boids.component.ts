import { Boids } from './boids.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-boids',
  templateUrl: './boids.component.html',
  styleUrls: ['./boids.component.scss'],
})
export class BoidsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('boidsWrapper') wrapper: ElementRef;
  public app: Canvas;

  ngAfterViewInit(): void {
    this.app = new Boids(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
