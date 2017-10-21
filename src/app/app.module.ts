import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules for ui components
import { AppCustomMaterialModule } from './modules/app-custom-material.module';

// own modules
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
