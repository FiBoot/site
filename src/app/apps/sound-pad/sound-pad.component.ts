import { Component, OnDestroy, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { SoundPad } from './classes/sound-pad.class';

@Component({
  selector: 'app-sound-pad',
  templateUrl: './sound-pad.component.html',
  styleUrls: ['./sound-pad.component.scss'],
})
export class SoundPadComponent implements AfterContentInit, OnDestroy {
  @ViewChild('soundPadWrapper') wrapper: ElementRef;
  private app: SoundPad;

  ngAfterContentInit(): void {
    this.app = new SoundPad(this.wrapper.nativeElement)
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
