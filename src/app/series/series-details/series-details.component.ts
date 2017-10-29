import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css'],
  providers: [ SeriesService, TdMediaService ]
})
export class SeriesDetailsComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  private _querySubscription: Subscription;

  apiImg = API.apiImg + 'original';
  series = [];
  crew = [];
  networks = [];
  companies = [];

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
      title: 'Recommendations',
      value: '4',
      icon: 'tv',
    },
  ];

  currentTab = 1;

  constructor(private seriesService: SeriesService,
              private route: ActivatedRoute,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.registerLoading();

    this.updateSeriesDetails();
    this.updateSeriesCredits();

    this.checkScreen();
    this.watchScreen();
  }

  updateSeriesDetails(): void {
    this.route.params.switchMap((params: Params) => this.seriesService
      .getSeriesDetails(params['id']))
      .subscribe(response => {
        this.series = response;
        this.networks = response['networks'];
        this.companies = response['production_companies'];
        this.resolveLoading();
      });
  }

  updateSeriesCredits(): void {
    this.route.params.switchMap((params: Params) => this.seriesService
      .getSeriesCredits(params['id']))
      .subscribe(response => {
        this.crew = response['crew'];
      });
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
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
   * subscribes the service 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = matches;
      });
    });
  }

  /**
   * gets an array of genres and returns them separated by commas
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
   * gets the time in minutes and returns it in HH:mm format
   * @param minutes: Integer with the minutes
   * @returns {string}: Time with the new format
   */
  convertTime(minutes: number): string {
    let text = '';
    let hourTime = 0;
    if (minutes) {
      if ((hourTime = Math.floor(minutes / 60)) > 0) {
        text += hourTime + 'h ';
      }
      if (minutes % 60 !== 0) {
        text += (minutes % 60) + 'min';
      }
    }

    return text;
  }

  /**
   * gets a budget and returns it formatted
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
    this._loadingService.register('series-details');
  }

  resolveLoading(): void {
    this._loadingService.resolve('series-details');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('seriesDetails', value);
  }

}
