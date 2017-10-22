import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
      route: '/movies',
      icon: 'local_movies',
    }, {
      title: 'People',
      route: '/people',
      icon: 'people',
    }, {
      title: 'TV Series',
      route: '/series',
      icon: 'tv',
    },
  ];
}
