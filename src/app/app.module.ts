import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importieren Sie HttpClientModule

import { AppComponent } from './app.component';
import {WebcamModule} from "ngx-webcam";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule // Fügen Sie HttpClientModule in das imports-Array hinzu
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
