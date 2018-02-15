import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KonvaService } from './core/konva.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    KonvaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
