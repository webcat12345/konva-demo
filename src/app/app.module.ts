import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material/material.module';

import { KonvaService } from './core/konva.service';

import { AppComponent } from './app.component';
import { PalletteComponent } from './pallette/pallette.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    PalletteComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    KonvaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
