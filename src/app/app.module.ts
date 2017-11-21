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
import { MovieImagesComponent } from './movies/movie-images/movie-images.component';
import { MovieVideosComponent } from './movies/movie-videos/movie-videos.component';
import { MovieCastComponent } from './movies/movie-cast/movie-cast.component';
import { MovieReviewsComponent } from './movies/movie-reviews/movie-reviews.component';
import { MovieRecommendationsComponent } from './movies/movie-recommendations/movie-recommendations.component';
import { SeriesDetailsComponent } from './series/series-details/series-details.component';
import { SeriesImagesComponent } from './series/series-images/series-images.component';
import { SeriesVideosComponent } from './series/series-videos/series-videos.component';
import { FormatStringPipe } from './shared/format-string/format-string.pipe';
import { SeriesCastComponent } from './series/series-cast/series-cast.component';
import { SeriesRecommendationsComponent } from './series/series-recommendations/series-recommendations.component';
import { PersonDetailsComponent } from './people/person-details/person-details.component';
import { PersonMoviesComponent } from './people/person-movies/person-movies.component';
import { PersonSeriesComponent } from './people/person-series/person-series.component';
import { PersonImagesComponent } from './people/person-images/person-images.component';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DiscoverComponent } from './discover/discover.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    FooterComponent,
    TrendingComponent,
    ListSeriesComponent,
    ListPeopleComponent,
    MovieDetailsComponent,
    ListPeopleComponent,
    MovieImagesComponent,
    MovieVideosComponent,
    MovieCastComponent,
    MovieReviewsComponent,
    MovieRecommendationsComponent,
    SeriesDetailsComponent,
    SeriesImagesComponent,
    SeriesVideosComponent,
    FormatStringPipe,
    SeriesCastComponent,
    SeriesRecommendationsComponent,
    PersonDetailsComponent,
    PersonMoviesComponent,
    PersonSeriesComponent,
    PersonImagesComponent,
    SearchComponent,
    SearchBarComponent,
    NotFoundComponent,
    DiscoverComponent
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
