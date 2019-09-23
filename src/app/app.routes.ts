import { loadAppsRouteModule } from './apps/apps.module';
import { DefaultComponent } from './views/default/default.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'apps', loadChildren: loadAppsRouteModule },
  { path: '**', redirectTo: '' }
];
