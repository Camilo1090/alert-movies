import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// own modules
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
