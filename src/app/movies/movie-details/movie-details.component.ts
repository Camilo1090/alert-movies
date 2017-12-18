import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { MoviesService } from '../shared/movies.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  // Used for responsive services
  isDesktop = false;
  _querySubscription: Subscription;

  apiImgOrig = API.apiImg + 'original';
  apiImgBack = API.apiImg + 'w1400_and_h450_bestv2';
  movie = [];
  crew = [];
  creditsObservable: Observable<any[]>;

  routes: Object[] = [
    {
      title: 'Images',
      value: '1',
      icon: 'image',
    }, {
      title: 'Videos',
      value: '2',
      icon: 'video_library',
    }, {
      title: 'Cast',
      value: '3',
      icon: 'people',
    },
    {
      title: 'Reviews',
      value: '4',
      icon: 'comment',
    },
    {
      title: 'Recommendations',
      value: '5',
      icon: 'movie',
    },
  ];

  currentTab = 1;

  constructor(public moviesService: MoviesService,
              public router: Router,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.registerLoading();
      this.updateMovieDetails();
    });

    this.checkScreen();
    this.watchScreen();
  }

  // updates movie details
  updateMovieDetails(): void {
    this.route.params.switchMap((params: Params) => this.moviesService
      .getMovieDetails(params['id']))
      .subscribe(response => {
        this.movie = response;
        this.updateCredits();
      }, err => {
        if (err['status'] === 404) {
          this.router.navigate(['/404']);
        }
        console.log(err);
        this.resolveLoading();
      });
  }

  // updates movie crew credits
  updateCredits(): void {
    this.creditsObservable = this.route.params
      .switchMap((params: Params) => this.moviesService
        .getMovieCredits(params['id']));
    this.creditsObservable
      .subscribe(response => {
        this.crew = response['crew'];
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  // changes tab number to display the corresponding component
  changeTab(tab: number): void {
    this.currentTab = tab;
  }

  /**
   * gets an array of genres and returns them separated by comma
   * @param genres: Array of genres
   * @returns {string}: List of genres separated by comma
   */
  getGenres(genres: Array<any>): string {
    let names = '';
    if (genres) {
      for (let i = 0; i < genres.length - 1; i++) {
        names += genres[i]['name'] + ', ';
      }
      names += genres[genres.length - 1]['name'];
    }
    return names;
  }

  /**
   * gets the time in minutes and returns it in HH:mm format
   * @param minutes: Integer with the minutes
   * @returns {string}: Time with the new format
   */
  convertTime(minutes: number): string {
    let result = '';
    if (minutes) {
      const hours = Math.floor(minutes / 60);
      if (hours >= 1) {
        result += hours + 'h ';
      }
      if (minutes % 60 !== 0) {
        result += (minutes % 60) + 'min';
      }
    }
    return result;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

  /**
   * checks the size of the screen
   */
  checkScreen(): void {
    this._ngZone.run(() => {
      this.isDesktop = this._mediaService.query('gt-sm');
    });
  }

  /**
   * subscribes the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = matches;
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movie-details');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movie-details');
  }
}
