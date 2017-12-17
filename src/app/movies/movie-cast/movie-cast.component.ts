import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.css']
})
export class MovieCastComponent implements OnInit, OnDestroy {

  // Used for responsive services
  columns: number;
  _querySubscription: Subscription;

  movieCast = [];
  apiImg = API.apiImg + 'w500';

  constructor(public moviesService: MoviesService,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateMovieCast();

    this.checkScreen();
    this.watchScreen();
  }

  updateMovieCast(): void {
    this.route.params.switchMap((params: Params) => this.moviesService
      .getMovieCredits(params['id']))
      .subscribe(response => {
        this.movieCast = response['cast'].slice(0, 20);
        this.resolveLoading();
      });
  }

  getCharacter(person: any): string {
    let character = '';
    if (person['character']) {
      character = 'as ' + person['character'];
    }
    return character;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

  /**
   * Check the size of the screen
   */
  checkScreen(): void {
    // this.columns = 5;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 2;
      }
      if (this._mediaService.query('(max-width: 375px)')) {
        this.columns = 1;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 3;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 4;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 5;
      }
    });
  }

  /**
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 5;
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('(max-width: 375px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 5;
        }
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movie-cast');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movie-cast');
  }
}
