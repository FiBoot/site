import { BlocksComponent } from './blocks/blocks.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BlocksComponent, MenuComponent],
  exports: [BlocksComponent, MenuComponent],
  imports: [RouterModule, BrowserModule]
})
export class ComponentsModule {}
