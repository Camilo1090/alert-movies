import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// pagination
import { IPageChangeEvent } from '@covalent/core';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { SeriesService } from '../shared/series.service';

@Component({
  selector: 'app-series-recommendations',
  templateUrl: './series-recommendations.component.html',
  styleUrls: ['./series-recommendations.component.css']
})
export class SeriesRecommendationsComponent implements OnInit, OnDestroy {

  // Used for responsive services
  columns: number;
  _querySubscription: Subscription;

  // Used for the pagination
  currentPage = 1;
  firstLast = true;
  pageSizeAll = false;
  totalPages: number;
  totalResults: number;

  recommendations = [];

  apiImg = API.apiImg + 'w500';

  constructor(public seriesService: SeriesService,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateSeriesRecommendations(1);

    this.checkScreen();
    this.watchScreen();
  }

  // updates the list of recommendations for a given tv series
  updateSeriesRecommendations(page: number): void {
    this.route.params.switchMap((params: Params) => this.seriesService
      .getSeriesRecommendations(params['id'], page))
      .subscribe(response => {
        this.recommendations = response['results'].sort((a: any, b: any) => b['popularity'] - a['popularity']);
        this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
        this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  /**
   * manages the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.registerLoading();
    this.updateSeriesRecommendations(event.page);
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
    // this.columns = 4;
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
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 4;
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
    this._loadingService.register('series-recommendations');
  }

  resolveLoading(): void {
    this._loadingService.resolve('series-recommendations');
  }
}
