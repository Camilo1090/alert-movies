import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';

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
  selector: 'app-list-series',
  templateUrl: './list-series.component.html',
  styleUrls: ['./list-series.component.css'],
  providers: [ SeriesService ]
})
export class ListSeriesComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  columns: number;
  private _querySubscription: Subscription;

  // categories
  selectedCategory = 'popular';
  categories = [
    {
      value: 'popular',
      viewValue: 'Popular'
    },
    {
      value: 'air',
      viewValue: 'On The Air'
    },
    {
      value: 'latest',
      viewValue: 'Latest'
    },
    {
      value: 'top',
      viewValue: 'Top Rated'
    },
  ];

  // Used for the pagination
  event: IPageChangeEvent;
  firstLast = true;
  pageSizeAll = false;
  pageLinkCount = 5;
  totalPages: number;

  response = [];
  series = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(private seriesService: SeriesService,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateSeries(1);

    this.checkScreen();
    this.watchScreen();
  }

  onCategoryChanged(newValue: string): void {
    this.selectedCategory = newValue;
    this.updateSeries(1);
  }

  updateSeries(page: number): void {
    switch (this.selectedCategory) {
      case 'popular': {
        this.seriesService.getPopularSeries(page).subscribe(series => {
          this.response = series;
          this.series = series['results'];
          this.totalPages = series['total_pages'];
          this.resolveMoviesLoading();
        });
        break;
      }
      case 'air': {
        this.seriesService.getOnTheAirSeries(page).subscribe(series => {
          this.response = series;
          this.series = series['results'];
          this.totalPages = series['total_pages'];
          this.resolveMoviesLoading();
        });
        break;
      }
      case 'latest': {
        this.seriesService.getLatestSeries(page).subscribe(series => {
          this.response = series;
          this.series = series['results'];
          this.totalPages = series['total_pages'];
          this.resolveMoviesLoading();
        });
        break;
      }
      case 'top': {
        this.seriesService.getTopRatedSeries(page).subscribe(series => {
          this.response = series;
          this.series = series['results'];
          this.totalPages = series['total_pages'];
          this.resolveMoviesLoading();
        });
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  /**
   * Check the size of the screen
   */
  checkScreen(): void {
    this.columns = 4;
    this._ngZone.run(() => {
      this.isDesktop = !this._mediaService.query('xs');
      if (this._mediaService.query('xs')) {
        this.columns = 1;
      }
    });
    this._ngZone.run(() => {
      if (this._mediaService.query('sm')) {
        this.columns = 2;
      }
    });
    this._ngZone.run(() => {
      if (this._mediaService.query('md')) {
        this.columns = 3;
      }
    });
    this._ngZone.run(() => {
      if (this._mediaService.query('lg')) {
        this.columns = 4;
      }
    });
  }

  /**
   * This method subscribes with the service 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this.columns = 4;
    this._querySubscription = this._mediaService.registerQuery('xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = !matches;
        if (matches) {
          this.columns = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('lg').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
        }
      });
    });
  }

  /**
   * Get an array of genres by id and return the name of these separated by comma
   * @param genresId: Array of genres by id
   * @returns {string}: List of genres separated by comma
   */
  getGenre(genresId: Array<number>): any {
    let genres = '';
    if (genresId) {
      for (const id of genresId) {
        if (id === genresId[genresId.length - 1]) {
          genres += GENRES[id];
        } else {
          genres += GENRES[id] + ', ';
        }
      }
    }
    return genres;
  }

  /**
   * In charge to manage the behavior of the pagination
   * @param event: Event of change the page
   */
  change(event: IPageChangeEvent): void {
    this.event = event;
    this.registerLoading();
    this.updateSeries(event.page);
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('series');
  }

  resolveMoviesLoading(): void {
    this._loadingService.resolve('series');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('series', value);
  }
}
