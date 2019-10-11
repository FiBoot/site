import { ComponentsModule } from '../components/components.module';
import { AppsComponent } from './apps.component';
import { APPS_ROUTES } from './apps.routes';
import { ArchitectsLogoComponent } from './architects-logo/architects-logo.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { AmplitudeComponent } from './amplitude/amplitude.component';

@NgModule({
  declarations: [AppsComponent, ArchitectsLogoComponent, AmplitudeComponent],
  imports: [RouterModule.forChild(APPS_ROUTES), CommonModule, Ng5SliderModule, ComponentsModule]
})
export class AppsModule {}

export function loadAppsRouteModule() {
  return AppsModule;
}
