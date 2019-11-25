import { Component } from '@angular/core';
import { IBlock } from 'src/app/models/block.model';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  apps: Array<IBlock> = [
    { title: 'Architects Logo', description: '', link: 'apps/architects-logo' },
    { title: 'Noise test', description: '', link: 'apps/noise-test' },
  ];
}
