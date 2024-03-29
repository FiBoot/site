import { Component } from '@angular/core';
import { IBlock } from 'src/app/models/block.model';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
})
export class AppsComponent {
  apps: Array<IBlock> = [
    { title: 'Satisfactory planner', link: 'apps/satisfactory-planner' },
    { title: 'Architects Logo', description: 'animated noise logo', link: 'apps/architects-logo' },
    { title: 'Noise test', link: 'apps/noise-test' },
    { title: 'Forgemagie', description: 'dofus forgemagie calculator', link: 'apps/forgemagie' },
    { title: 'Web', link: 'apps/web' },
    { title: 'Asteroid', link: 'apps/asteroid' },
    { title: 'AmongUs', description: 'training', link: 'apps/among-us' },
    { title: 'Boids', description: 'bird coherence', link: 'apps/boids' },
  ];
}
