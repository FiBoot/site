import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AppsModule } from './apps/apps.module';
import { ComponentsModule } from './components/components.module';
import { DefaultComponent } from './views/default/default.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, DefaultComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    HttpClientModule,
    ComponentsModule,
    AppsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
