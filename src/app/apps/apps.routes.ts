import { AppsComponent } from './apps.component';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { BoidsComponent } from './boids/boids.component';
import { NoiseTestComponent } from './noise-test/noise-test.component';
import { Routes } from '@angular/router';

export const APPS_ROUTES: Routes = [
  { path: 'apps', component: AppsComponent },
  { path: 'apps/architects-logo', component: ArchitectsLogoComponent },
  { path: 'apps/noise-test', component: NoiseTestComponent },
  { path: 'apps/boids', component: BoidsComponent },
  { path: 'apps/**', redirectTo: '' }
];
