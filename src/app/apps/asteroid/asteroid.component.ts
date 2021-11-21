import { Asteroid } from './asteroid.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements AfterViewInit, OnDestroy {
  @ViewChild('asteroidWrapper') wrapper: ElementRef;
  public app: Canvas;

  ngAfterViewInit(): void {
    this.app = new Asteroid(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }

}
