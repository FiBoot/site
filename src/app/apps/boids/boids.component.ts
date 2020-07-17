import { Boids } from './boids.class';
import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterContentInit,
} from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-boids',
  templateUrl: './boids.component.html',
  styleUrls: ['./boids.component.scss'],
})
export class BoidsComponent implements AfterContentInit, OnDestroy {
  @ViewChild('boidsWrapper') wrapper: ElementRef;
  public app: Canvas;

  ngAfterContentInit(): void {
    this.app = new Boids(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.destory();
  }
}
