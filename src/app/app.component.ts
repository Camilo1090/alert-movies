import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Alert Movies';

  routes: Object[] = [
    {
      title: 'Home',
      route: '/',
      icon: 'home',
    }, {
      title: 'Movies',
      route: '/',
      icon: 'local_movies',
    }, {
      title: 'People',
      route: '/',
      icon: 'people',
    }, {
      title: 'TV Series',
      route: '/',
      icon: 'tv',
    },
  ];
}
