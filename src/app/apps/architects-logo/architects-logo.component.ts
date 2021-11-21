import { ArchitectsLogo } from './architects-logo.class';
import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-architects-logo',
  templateUrl: './architects-logo.component.html',
  styleUrls: ['./architects-logo.component.css'],
})
export class ArchitectsLogoComponent implements AfterContentInit, OnDestroy {
  @ViewChild('logoWrapper') wrapper: ElementRef;
  public loaded = false;
  public app: Canvas;

  ngAfterContentInit(): void {
    this.app = new ArchitectsLogo(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
