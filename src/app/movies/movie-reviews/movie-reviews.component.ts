import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { IPageChangeEvent } from '@covalent/core';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load shared
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { MoviesService } from '../shared/movies.service';

// pipes
import { FormatStringPipe } from '../../shared/format-string/format-string.pipe';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css'],
  providers: [ TdMediaService ],
  // encapsulation: ViewEncapsulation.None
})
export class MovieReviewsComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = true;
  columns: number;
  private _querySubscription: Subscription;

  // Used for the pagination
  currentPage = 1;
  firstLast = true;
  pageSizeAll = false;
  totalPages: number;
  totalResults: number;

  reviews = [];

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
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
    this.route.params.switchMap((params: Params) => this.moviesService
      .getMovieReviews(params['id'], page))
      .subscribe(response => {
        this.reviews = response['results'];
        this.totalPages = response['total_pages'];
        this.totalResults = response['total_results'];
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
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
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
   * In charge to manage the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.registerLoading();
    this.updateMovies(event.page);
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movie-reviews');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movie-reviews');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('movie-reviews', value);
  }

}
