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


const routes: Routes = [
  { path: '', redirectTo: '/trending', pathMatch: 'full' },
  { path: 'trending',  component: TrendingComponent },
  { path: 'list-movies', component: ListMoviesComponent },
  { path: 'list-people', component: ListPeopleComponent },
  { path: 'list-series', component: ListSeriesComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'series/:id', component: SeriesDetailsComponent },
  { path: 'person/:id', component: PersonDetailsComponent },
  { path: 'search/:media', component: SearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
