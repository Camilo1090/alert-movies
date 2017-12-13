import {Component, ViewEncapsulation} from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {TdMediaService} from "@covalent/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Alert Movies';
  logo = 'assets/img/tmdb.svg';

  singular: Object[] = [
    {
      title: 'Trending',
      route: '/trending',
      icon: 'whatshot'
    }, {
      title: 'Discover',
      route: '/discover',
      icon: 'new_releases'
    }, {
      title: 'People',
      route: '/list-people',
      icon: 'people'
    }
  ];

  movies: Object[] = [
    {
      title: 'Popular Movies',
      route: '/list-movies/popular',
      icon: 'fire'
    }, {
      title: 'Playing Now Movies',
      route: '/list-movies/now',
      icon: 'ticket'
    }, {
      title: 'Upcoming Movies',
      route: '/list-movies/upcoming',
      icon: 'caret-square-o-right'
    }, {
      title: 'Top Rated Movies',
      route: '/list-movies/top',
      icon: 'star'
    },
  ];

  series: Object[] = [
    {
      title: 'Popular TV Series',
      route: '/list-series/popular',
      icon: 'fire'
    }, {
      title: 'On The Air TV Series',
      route: '/list-series/air',
      icon: 'ticket'
    }, {
      title: 'Latest TV Series',
      route: '/list-series/latest',
      icon: 'caret-square-o-right'
    }, {
      title: 'Top Rated TV Series',
      route: '/list-series/top',
      icon: 'star'
    },
  ];

  routes: Object[] = [
    {
      title: 'Trending',
      route: '/trending',
      icon: 'whatshot',
    }, {
      title: 'Discover',
      route: '/discover',
      icon: 'new_releases',
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

  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'tmdb',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/tmdb.svg'));
  }
}
