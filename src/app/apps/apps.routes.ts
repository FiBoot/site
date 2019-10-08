import { AmplitudeComponent } from './amplitude/amplitude.component';
import { AppsComponent } from './apps.component';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { Routes } from '@angular/router';

export const APPS_ROUTES: Routes = [
  { path: 'apps', component: AppsComponent },
  { path: 'apps/architects-logo', component: ArchitectsLogoComponent },
  { path: 'apps/amplitude', component: AmplitudeComponent },
  { path: 'apps/**', redirectTo: '' }
];
