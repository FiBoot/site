import { Web } from './web.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements AfterViewInit, OnDestroy {
  @ViewChild('webWrapper') wrapper: ElementRef;
  public app: Canvas;

  ngAfterViewInit(): void {
    this.app = new Web(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.destory();
  }

}
