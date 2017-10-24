import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MovieDetailsComponent} from './movies/movie-details/movie-details.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { TrendingComponent } from './trending/trending.component';
import { PeopleComponent} from './people/people.component';
import { ListSeriesComponent} from './series/list-series/list-series.component';


const routes: Routes = [
  { path: '', redirectTo: '/trending', pathMatch: 'full' },
  { path: 'trending',  component: TrendingComponent },
  { path: 'list-movies', component: ListMoviesComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'list-series', component: ListSeriesComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
