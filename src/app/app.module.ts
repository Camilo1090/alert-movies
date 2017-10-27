import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules for ui components
import { AppCustomMaterialModule } from './custom-material/app-custom-material.module';

// own modules
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { TrendingComponent } from './trending/trending.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { ListPeopleComponent } from './people/list-people/list-people.component';
import { ListSeriesComponent } from './series/list-series/list-series.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    FooterComponent,
    TrendingComponent,
    ListSeriesComponent,
    ListPeopleComponent,
    MovieDetailsComponent,
    ListPeopleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AppCustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
