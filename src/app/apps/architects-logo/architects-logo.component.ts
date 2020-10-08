import { ArchitectsLogo } from './architects-logo.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-architects-logo',
  templateUrl: './architects-logo.component.html',
  styleUrls: ['./architects-logo.component.css']
})
export class ArchitectsLogoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('logoWrapper') wrapper: ElementRef;
  public loaded = false;
  public app: Canvas;

  ngAfterViewInit(): void {
    this.app = new ArchitectsLogo(this.wrapper.nativeElement);
    setTimeout(() => this.loaded = true);
  }

  ngOnDestroy(): void {
    this.app.destory();
  }
}
