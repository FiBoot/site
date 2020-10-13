import { ComponentsModule } from '../components/components.module';
import { AppsComponent } from './apps.component';
import { APPS_ROUTES } from './apps.routes';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { NoiseTestComponent } from './noise-test/noise-test.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { BoidsComponent } from './boids/boids.component';
import { SoundPadComponent } from './sound-pad/sound-pad.component';
import { ForgemagieComponent } from './forgemagie/forgemagie.component';
import { AsteroidComponent } from './asteroid/asteroid.component';

@NgModule({
  declarations: [
    AppsComponent,
    ArchitectsLogoComponent,
    NoiseTestComponent,
    BoidsComponent,
    SoundPadComponent,
    ForgemagieComponent,
    AsteroidComponent,
  ],
  imports: [
    RouterModule.forChild(APPS_ROUTES),
    CommonModule,
    Ng5SliderModule,
    ComponentsModule,
  ],
})
export class AppsModule {}

export function loadAppsRouteModule() {
  return AppsModule;
}
