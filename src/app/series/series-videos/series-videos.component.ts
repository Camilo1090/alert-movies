import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load shared
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../../shared/api/api';
import { GENRES } from '../../shared/api/genres';

// services
import { SeriesService } from '../shared/series.service';

@Component({
  selector: 'app-series-videos',
  templateUrl: './series-videos.component.html',
  styleUrls: ['./series-videos.component.css'],
  providers: [ SeriesService, TdMediaService ]
})
export class SeriesVideosComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = true;
  columns: number;
  private _querySubscription: Subscription;

  seriesVideos = [];
  apiVideo = API.apiVideo;

  constructor(private seriesService: SeriesService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateSeriesVideos();

    this.checkScreen();
    this.watchScreen();
  }

  updateSeriesVideos(): void {
    this.route.params.switchMap((params: Params) => this.seriesService
      .getSeriesVideos(params['id']))
      .subscribe(response => {
        this.seriesVideos = response['results'].slice(0, 12);
        this.resolveLoading();
      });
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  /**
   * checks the size of the screen
   */
  checkScreen(): void {
    // this.columns = 4;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 1;
        this.isDesktop = false;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 2;
        this.isDesktop = true;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 3;
        this.isDesktop = true;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 4;
        this.isDesktop = true;
      }
    });
  }

  /**
   * subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 4;
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)')
      .subscribe((matches: boolean) => {
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
          this.columns = 2;
          this.isDesktop = true;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
          this.isDesktop = true;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
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
    this._loadingService.register('series-videos');
  }

  resolveLoading(): void {
    this._loadingService.resolve('series-videos');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('seriesVideos', value);
  }

  getUrl(key: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiVideo + key);
  }

}
