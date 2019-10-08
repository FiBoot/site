import { Amplitude } from './classes/amplitude.sketch';
import { Component } from '@angular/core';
import { Noise } from 'src/app/classes/noise.class';

@Component({
  selector: 'app-amplitude',
  templateUrl: './amplitude.component.html',
  styleUrls: ['./amplitude.component.scss']
})
export class AmplitudeComponent {
  constructor() {
    new Amplitude();
    const a = new Noise();
  }
}
