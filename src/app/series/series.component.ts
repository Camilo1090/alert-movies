import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load service
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../static/api';
import { GENRES } from '../static/genres';

// services
import { SeriesService } from './series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  providers: [ SeriesService ]
})
export class SeriesComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  querySize = 'gt-xs';
  private _querySubscription: Subscription;

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

  updateSeries(page: number): void {
    this.seriesService.getPopularSeries(page).subscribe(series => {
      this.response = series;
      this.series = series['results'];
      this.totalPages = series['total_pages'];
      this.resolveMoviesLoading();
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
      if (this.isDesktop) {
        this.pageLinkCount = 3;
      } else {
        this.pageLinkCount = 0;
      }
    });
  }

  /**
   * This method subscribes with the service 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery(this.querySize).subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = matches;
        if (this.isDesktop) {
          this.pageLinkCount = 3;
        } else {
          this.pageLinkCount = 0;
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
