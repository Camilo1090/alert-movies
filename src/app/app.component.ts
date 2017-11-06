import {Component, ViewEncapsulation} from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Alert Movies';
  logo = '../assets/img/tmdb.svg';

  routes: Object[] = [
    {
      title: 'Trending',
      route: '/trending',
      icon: 'whatshot',
    }, {
      title: 'Movies',
      route: '/list-movies',
      icon: 'local_movies',
    }, {
      title: 'People',
      route: '/list-people',
      icon: 'people',
    }, {
      title: 'TV Series',
      route: '/list-series',
      icon: 'tv',
    },
  ];
}
