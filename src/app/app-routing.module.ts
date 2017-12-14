import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MovieDetailsComponent} from './movies/movie-details/movie-details.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { TrendingComponent } from './trending/trending.component';
import { ListPeopleComponent } from './people/list-people/list-people.component';
import { ListSeriesComponent } from './series/list-series/list-series.component';
import { SeriesDetailsComponent } from './series/series-details/series-details.component';
import { PersonDetailsComponent } from './people/person-details/person-details.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DiscoverComponent } from './discover/discover.component';


const routes: Routes = [
  { path: '', redirectTo: '/trending', pathMatch: 'full' },
  { path: 'trending',  component: TrendingComponent },
  { path: 'discover', redirectTo: '/discover/movies', pathMatch: 'full' },
  { path: 'discover/:category',  component: DiscoverComponent },
  { path: 'list-movies', redirectTo: '/list-movies/popular', pathMatch: 'full' },
  { path: 'list-movies/:category', component: ListMoviesComponent },
  { path: 'list-people', component: ListPeopleComponent },
  { path: 'list-series', redirectTo: '/list-series/popular', pathMatch: 'full' },
  { path: 'list-series/:category', component: ListSeriesComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'series/:id', component: SeriesDetailsComponent },
  { path: 'person/:id', component: PersonDetailsComponent },
  { path: 'search/:media', component: SearchComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
