import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load service
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../../static/api';
import { GENRES } from '../../static/genres';

// services
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [ MoviesService, TdMediaService ]
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  // Used for responsive services
  isDesktop = false;
  querySize = 'gt-sm';
  private _querySubscription: Subscription;

  apiImg = API.apiImg + 'original';
  movie = [];
  credits = [];

  routes: Object[] = [
    {
      title: 'Images',
      value: '1',
      icon: 'image',
    }, {
      title: 'Videos',
      value: '2',
      icon: 'local_movies',
    }, {
      title: 'Cast',
      value: '3',
      icon: 'person',
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

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.registerLoading();

    this.updateMovie();
    this.updateCredits();

    this.checkScreen();
    this.watchScreen();
  }

  updateMovie(): void {
    this.route.params.switchMap((params: Params) => this.moviesService
      .getMovieDetails(params['id']))
      .subscribe(movie => {
        this.movie = movie;
        this.resolveLoading();
      });
  }

  updateCredits(): void {
    this.route.params.switchMap((params: Params) => this.moviesService
      .getMovieCredits(params['id']))
      .subscribe(credits => {
        this.credits = credits;
        console.log(this.credits);
      });
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  /**
   * Check the size of the screen
   */
  checkScreen(): void {
    this._ngZone.run(() => {
      this.isDesktop = this._mediaService.query(this.querySize);
    });
  }

  /**
   * This method subscribe with the service 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery(this.querySize).subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = matches;
      });
    });
  }

  /**
   * In charge to get an array of genres and return its separated by comma
   * @param genres: Array of genres
   * @returns {string}: List of genres separated by comma
   */
  getGenre(genres: Array<any>): string {
    let names = '';
    if (genres) {
      for (const genre of genres) {
        if (genre === genres[genres.length - 1]) {
          names += genre['name'];
        } else {
          names += genre['name'] + ', ';
        }
      }
    }
    return names;
  }

  /**
   * In charge to get time in minutes and return its in the format HH:mm
   * @param minutes: Integer with the minutes
   * @returns {string}: Time with the new format
   */
  convertTime(minutes: number): string {
    let text = '';
    if (minutes) {
      text += Math.floor(minutes / 60) + 'h ';
      if (minutes % 60 !== 0) {
        text += (minutes % 60) + 'min';
      }
    }

    return text;
  }

  /**
   * In charge to get a budget and return its with the format of money
   * @param budget: Integer with the budget
   * @returns {string}: Budget with the new format
   */
  convertMoney(budget: number): string {
    let text = '$';
    if (budget) {
      const buffer = '' + budget;
      for (let _i = 0; _i < buffer.length; _i++) {
        if (_i % 3 === 0 && _i !== 0) {
          text += ',' + buffer[_i];
        } else {
          text += buffer[_i];
        }
      }
    }
    return text;
  }

  changeTab(tab: number): void {
    this.currentTab = tab;
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movie');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movie');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('movie', value);
  }
}
