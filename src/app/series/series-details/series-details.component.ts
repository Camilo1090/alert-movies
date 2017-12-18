import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { SERIES_GENRES } from '../../shared/api/genres';

// services
import { SeriesService } from '../shared/series.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css']
})
export class SeriesDetailsComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  _querySubscription: Subscription;

  apiImgOrig = API.apiImg + 'original';
  apiImgBack = API.apiImg + 'w1400_and_h450_bestv2';
  series = [];
  crew = [];
  creditsObservable: Observable<any[]>;
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

  constructor(public seriesService: SeriesService,
              public router: Router,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.registerLoading();
      this.updateSeriesDetails();
    });

    this.checkScreen();
    this.watchScreen();
  }

  // updates the details of a given tv series
  updateSeriesDetails(): void {
    this.route.params.switchMap((params: Params) => this.seriesService
      .getSeriesDetails(params['id']))
      .subscribe(response => {
        this.series = response;
        this.networks = response['networks'];
        this.companies = response['production_companies'];
        this.updateSeriesCredits();
      }, err => {
        if (err['status'] === 404) {
          this.router.navigate(['/404']);
        }
        console.log(err);
        this.resolveLoading();
      });
  }

  // gets the featured crew of a given series
  updateSeriesCredits(): void {
    this.creditsObservable = this.route.params
      .switchMap((params: Params) => this.seriesService
        .getSeriesCredits(params['id']));
    this.creditsObservable
      .subscribe(response => {
        this.crew = response['crew'];
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  // changes tab
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
   * subscribes to the shared 'TdMediaService' to detect changes on the size of the screen
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
    this._loadingService.register('series-details');
  }

  resolveLoading(): void {
    this._loadingService.resolve('series-details');
  }
}
