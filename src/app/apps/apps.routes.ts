import { AppsComponent } from './apps.component';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { AsteroidComponent } from './asteroid/asteroid.component';
import { BoidsComponent } from './boids/boids.component';
import { ForgemagieComponent } from './forgemagie/forgemagie.component';
import { NoiseTestComponent } from './noise-test/noise-test.component';
import { SoundPadComponent } from './sound-pad/sound-pad.component';
import { Routes } from '@angular/router';

export const APPS_ROUTES: Routes = [
  { path: 'apps', component: AppsComponent },
  { path: 'apps/architects-logo', component: ArchitectsLogoComponent },
  { path: 'apps/noise-test', component: NoiseTestComponent },
  { path: 'apps/forgemagie', component: ForgemagieComponent },
  { path: 'apps/sound-pad', component: SoundPadComponent },
  { path: 'apps/boids', component: BoidsComponent },
  { path: 'apps/asteroid', component: AsteroidComponent },
  { path: 'apps/**', redirectTo: '' }
];
