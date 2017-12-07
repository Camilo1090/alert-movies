import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';

// For pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load shared
import { TdLoadingService } from '@covalent/core';

// carousel config
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

// api
import { API} from '../shared/api/api';
import { MOVIE_GENRES } from '../shared/api/genres';

// services
import { MoviesService } from '../movies/shared/movies.service';
import { SeriesService } from '../series/shared/series.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  providers: [ MoviesService, SeriesService, NgbCarouselConfig ]
})
export class TrendingComponent implements OnInit, OnDestroy {
  // Used for responsive services
  isDesktop = false;
  querySize = 'gt-xs';
  private _querySubscription: Subscription;

  response = [];
  movies = [];
  series = [];
  apiImg = API.apiImg + 'w1280';

  constructor(private moviesService: MoviesService,
              private seriesService: SeriesService,
              private carouselConfig: NgbCarouselConfig,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
    carouselConfig.interval = 3000;
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateMovies(1);
    this.updateSeries(1);

    this.checkScreen();
    this.watchScreen();
  }

  updateMovies(page: number): void {
    this.moviesService.getPopularMovies(page).subscribe(movies => {
      this.response = movies;
      this.movies = movies['results'].slice(0, 10).filter(a => a['backdrop_path']);
      this.resolveMoviesLoading();
    });
  }

  updateSeries(page: number): void {
    this.seriesService.getPopularSeries(page).subscribe(series => {
      this.response = series;
      this.series = series['results'].slice(0, 10).filter(a => a['backdrop_path']);
      this.resolveSeriesLoading();
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
    });
  }

  /**
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery(this.querySize).subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = matches;
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movies');
    this._loadingService.register('series');
  }

  resolveMoviesLoading(): void {
    this._loadingService.resolve('movies');
  }

  resolveSeriesLoading(): void {
    this._loadingService.resolve('series');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('movies', value);
  }
}
