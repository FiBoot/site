import { ArchitectsLogo } from './architects-logo.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-architects-logo',
  templateUrl: './architects-logo.component.html',
  styleUrls: ['./architects-logo.component.css'],
})
export class ArchitectsLogoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('logoWrapper') wrapper: ElementRef;
  public loaded = false;
  public app: ArchitectsLogo;

  ngAfterViewInit(): void {
    this.app = new ArchitectsLogo(this.wrapper?.nativeElement);
  }

  ngOnDestroy(): void {
    this.app?.destroy();
  }
}
