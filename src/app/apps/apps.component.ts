import { Component } from '@angular/core';
import { IBlock } from 'src/models/block.model';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  apps: Array<IBlock> = [
    { title: 'Architects Logo', description: '', link: 'apps/architects-logo' },
    { title: 'Amplitude', description: '', link: 'apps/amplitude' }
  ];
}
