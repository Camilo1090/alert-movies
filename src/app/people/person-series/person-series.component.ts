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
import { PeopleService } from '../shared/people.service';

@Component({
  selector: 'app-person-series',
  templateUrl: './person-series.component.html',
  styleUrls: ['./person-series.component.css']
})
export class PersonSeriesComponent implements OnInit, OnDestroy {

  // Used for responsive services
  columns: number;
  _querySubscription: Subscription;

  series = [];

  apiImg = API.apiImg + 'w500';

  constructor(public peopleService: PeopleService,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updatePersonSeries();

    this.checkScreen();
    this.watchScreen();
  }

  // updates the tv series of a person
  updatePersonSeries(): void {
    this.route.params.switchMap((params: Params) => this.peopleService
      .getPersonSeries(params['id']))
      .subscribe(response => {
        if (response['cast'].length >= response['crew'].length) {
          this.series = response['cast'];
        } else {
          this.series = response['crew'];
        }
        this.series = this.series.sort((a, b) => b['popularity'] - a['popularity']).slice(0, 20);
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  // gets the character of the person in the tv series
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
    this._loadingService.register('person-series');
  }

  resolveLoading(): void {
    this._loadingService.resolve('person-series');
  }
}
