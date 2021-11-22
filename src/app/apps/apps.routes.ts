import { AppsComponent } from './apps.component';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { AsteroidComponent } from './asteroid/asteroid.component';
import { BoidsComponent } from './boids/boids.component';
import { ForgemagieComponent } from './forgemagie/forgemagie.component';
import { NoiseTestComponent } from './noise-test/noise-test.component';
import { WebComponent } from './web/web.component';
import { Routes } from '@angular/router';
import { AmoungUsComponent } from './amoung-us/amoung-us.component';

export const APPS_ROUTES: Routes = [
  { path: 'apps', component: AppsComponent },
  { path: 'apps/architects-logo', component: ArchitectsLogoComponent },
  { path: 'apps/noise-test', component: NoiseTestComponent },
  { path: 'apps/forgemagie', component: ForgemagieComponent },
  { path: 'apps/boids', component: BoidsComponent },
  { path: 'apps/asteroid', component: AsteroidComponent },
  { path: 'apps/web', component: WebComponent },
  { path: 'apps/among-us', component: AmoungUsComponent },
  { path: 'apps/**', redirectTo: '' }
];
