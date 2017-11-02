import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';

// For pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load shared
import { TdLoadingService } from '@covalent/core';

// carousel config
import { CarouselConfig } from 'ngx-bootstrap';

// api
import { API} from '../shared/api/api';
import { GENRES } from '../shared/api/genres';

// services
import { MoviesService } from '../movies/shared/movies.service';
import { SeriesService } from '../series/shared/series.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  providers: [ MoviesService,
    SeriesService,
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: false } },
  ]
})
export class TrendingComponent implements OnInit, OnDestroy {
  public imageSources: string[] = [
    '../../assets/img/angular.png',
    '../../assets/img/alert.png',
    '../../assets/img/tmdb.svg'
  ];

  // Used for responsive services
  isDesktop = false;
  querySize = 'gt-xs';
  private _querySubscription: Subscription;

  // Used for the pagination
  event: IPageChangeEvent;
  firstLast = false;
  pageSizeAll = false;
  pageLinkCount = 5;

  response = [];
  movies = [];
  series = [];
  apiImg = API.apiImg + 'w1280';

  constructor(private moviesService: MoviesService,
              private seriesService: SeriesService,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
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
      this.movies = movies['results'].slice(0, 5);
      this.resolveMoviesLoading();
    });
  }

  updateSeries(page: number): void {
    this.seriesService.getPopularSeries(page).subscribe(series => {
      this.response = series;
      this.series = series['results'].slice(0, 5);
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
      if (this.isDesktop) {
        this.pageLinkCount = 3;
      } else {
        this.pageLinkCount = 0;
      }
    });
  }

  /**
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
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
    this.updateMovies(event.page);
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
