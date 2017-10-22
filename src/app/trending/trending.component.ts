import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';

// For pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load service
import { TdLoadingService } from '@covalent/core';
import { CarouselConfig } from 'ngx-bootstrap';

// api
import { API} from '../static/api';
import { GENRES } from '../static/genres';

// service
import { TrendingService } from './trending.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  providers: [TrendingService,
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true } },
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

  page: number;
  total_pages: number;
  total_results: number;
  response = [];
  movies = [];
  apiImg = API.apiImg + 'w500';

  constructor(private trendingService: TrendingService,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateMovies(1);

    this.checkScreen();
    this.watchScreen();
  }

  updateMovies(page: number): void {
    this.trendingService.getPopularMovies(page).subscribe(movies => {
      this.response = movies;
      this.movies = movies['results'];
      this.page = movies['page'];
      this.total_pages = movies['total_pages'];
      this.total_results = movies['total_results'];
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
    this.updateMovies(event.page);
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movies');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movies');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('movies', value);
  }
}
