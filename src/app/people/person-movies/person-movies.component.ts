import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

// Loading series
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { PeopleService } from '../shared/people.service';

@Component({
  selector: 'app-person-movies',
  templateUrl: './person-movies.component.html',
  styleUrls: ['./person-movies.component.css']
})
export class PersonMoviesComponent implements OnInit, OnDestroy {

  // Used for responsive services
  columns: number;
  _querySubscription: Subscription;

  movies = [];

  apiImg = API.apiImg + 'w500';

  constructor(public peopleService: PeopleService,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updatePersonMovies();

    this.checkScreen();
    this.watchScreen();
  }

  // updates the movies a person was part of
  updatePersonMovies(): void {
    this.route.params.switchMap((params: Params) => this.peopleService
      .getPersonMovies(params['id']))
      .subscribe(response => {
        if (response['cast'].length >= response['crew'].length) {
          this.movies = response['cast'].sort((a, b) => b['popularity'] - a['popularity']);
        } else {
          this.movies = response['crew'].sort((a, b) => b['popularity'] - a['popularity']);
        }
        this.movies = this.movies.slice(0, 20);
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  // gets the character played by the person in the movie or series
  getCharacter(result: any): string {
    let character = '';
    if (result['character']) {
      character = 'as ' + result['character'];
    } else if (result['job']) {
      character = 'as ' + result['job'];
    }
    return character;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

  /**
   * Checks the size of the screen
   */
  checkScreen(): void {
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 1;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 2;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 3;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 4;
      }
    });
  }

  /**
   * subscribes to the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)')
      .subscribe((matches: boolean) => {
        this._ngZone.run(() => {
          if (matches) {
            this.columns = 1;
          }
        });
      });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
        }
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('person-movies');
  }

  resolveLoading(): void {
    this._loadingService.resolve('person-movies');
  }
}
