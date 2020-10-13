import { SoundPad } from './classes/sound-pad.class';
import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sound-pad',
  templateUrl: './sound-pad.component.html',
  styleUrls: ['./sound-pad.component.scss'],
})
export class SoundPadComponent implements AfterContentInit, OnDestroy {
  @ViewChild('soundPadWrapper') wrapper: ElementRef;
  private app: SoundPad;

  public frequency: number;

  ngAfterContentInit(): void {
    this.app = new SoundPad(this.wrapper.nativeElement);
    this.app.frequency.subscribe(val => this.frequency = val);
  }

  ngOnDestroy(): void {
    this.app.destroy();
  }
}
