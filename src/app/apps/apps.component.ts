import { Component } from '@angular/core';
import { IBlock } from 'src/app/models/block.model';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  apps: Array<IBlock> = [
    { title: 'Architects Logo', description: 'animated noise logo', link: 'apps/architects-logo' },
    { title: 'Noise test', description: '', link: 'apps/noise-test' },
    { title: 'Forgemagie', description: 'dofus forgemagie calculator', link: 'apps/forgemagie' },
    { title: 'Sound Pad', description: 'testing frequencies', link: 'apps/sound-pad' },
    { title: 'Boids', description: 'bird coherence', link: 'apps/boids' },
  ];
}
