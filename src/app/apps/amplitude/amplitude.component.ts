import { Amplitude } from './classes/amplitude.class';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-amplitude',
  templateUrl: './amplitude.component.html',
  styleUrls: ['./amplitude.component.scss']
})
export class AmplitudeComponent {
  @ViewChild('amplitudeWrapper') wrapper: ElementRef;
  public app: Canvas;

  constructor() {
    setTimeout(() => {
      this.app = new Amplitude(this.wrapper.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.app.destory();
  }
}
