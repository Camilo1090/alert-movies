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
  selector: 'app-series-cast',
  templateUrl: './series-cast.component.html',
  styleUrls: ['./series-cast.component.css']
})
export class SeriesCastComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  columns: number;
  private _querySubscription: Subscription;

  seriesCast = [];
  apiImg = API.apiImg + 'w500';

  constructor(private seriesService: SeriesService,
              private route: ActivatedRoute,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateSeriesCast();

    this.checkScreen();
    this.watchScreen();
  }

  updateSeriesCast(): void {
    this.route.params.switchMap((params: Params) => this.seriesService
      .getSeriesCredits(params['id']))
      .subscribe(response => {
        this.seriesCast = response['cast'];
        this.resolveLoading();
      });
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  /**
   * Check the size of the screen
   */
  checkScreen(): void {
    // this.columns = 5;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 2;
        this.isDesktop = false;
      }
      if (this._mediaService.query('(max-width: 375px)')) {
        this.columns = 1;
        this.isDesktop = false;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 3;
        this.isDesktop = true;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 4;
        this.isDesktop = true;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 5;
        this.isDesktop = true;
      }
    });
  }

  /**
   * This method subscribes with the service 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 5;
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
          this.isDesktop = false;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('(max-width: 375px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 1;
          this.isDesktop = false;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
          this.isDesktop = true;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
          this.isDesktop = true;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 5;
          this.isDesktop = true;
        }
      });
    });
  }

  /**
   * gets an array of genres by id and returns the name of these separated by comma
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

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('series-cast');
  }

  resolveLoading(): void {
    this._loadingService.resolve('series-cast');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('seriesCast', value);
  }

}