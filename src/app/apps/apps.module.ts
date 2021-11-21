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
import { WebComponent } from './web/web.component';
import { AmoungUsComponent } from './amoung-us/amoung-us.component';
import { JdrCombatGeneratorComponent } from './jdr-combat-generator/jdr-combat-generator.component';

@NgModule({
  declarations: [
    AppsComponent,
    ArchitectsLogoComponent,
    NoiseTestComponent,
    BoidsComponent,
    SoundPadComponent,
    ForgemagieComponent,
    AsteroidComponent,
    WebComponent,
    AmoungUsComponent,
    JdrCombatGeneratorComponent,
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
