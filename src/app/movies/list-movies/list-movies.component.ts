import { Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdMediaService, TdPagingBarComponent } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// pagination
import { IPageChangeEvent } from '@covalent/core';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListMoviesComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  // Used for responsive services
  columns: number;
  _querySubscription: Subscription;

  // categories
  selectedCategory = 'popular';
  categories = [
    {
      value: 'popular',
      viewValue: 'Popular'
    },
    {
      value: 'now',
      viewValue: 'Playing Now'
    },
    {
      value: 'upcoming',
      viewValue: 'Upcoming'
    },
    {
      value: 'top',
      viewValue: 'Top Rated'
    },
  ];

  // Used for pagination
  currentPage = 1;
  firstLast = true;
  totalResults: number;
  totalPages: number;

  // results
  movies = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(public moviesService: MoviesService,
              public route: ActivatedRoute,
              public router: Router,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.registerLoading();
      // console.log(params);
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['page']) {
        this.currentPage = params['page'];
      }
      this.updateMovies();
    });

    this.checkScreen();
    this.watchScreen();
  }

  // updates the results according to the selected category
  updateMovies(): void {
    switch (this.selectedCategory) {
      case 'popular': {
        this.moviesService.getPopularMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          }
          this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
          this.resolveLoading();
        }, err => {
          console.log(err);
          this.resolveLoading();
        });
      } break;
      case 'now': {
        this.moviesService.getPlayingNowMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          }
          this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
          this.resolveLoading();
        }, err => {
          console.log(err);
          this.resolveLoading();
        });
      } break;
      case 'upcoming': {
        this.moviesService.getUpcomingMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          }
          this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
          this.resolveLoading();
        }, err => {
          console.log(err);
          this.resolveLoading();
        });
      } break;
      case 'top': {
        this.moviesService.getTopRatedMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          }
          this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
          this.resolveLoading();
        }, err => {
          console.log(err);
          this.resolveLoading();
        });
      } break;
      default: {
        this.resolveLoading();
        this.router.navigate(['/404']);
      } break;
    }
  }

  // navigates to page 1 when the category is changed (results are updated automatically)
  onCategoryChanged(): void {
    if (this.pagingBar) {
      this.pagingBar.navigateToPage(1);
    } else {
      this.router.navigate(['/list-movies', this.selectedCategory, {'page': 1}]);
    }
  }

  /**
   * manages the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.router.navigate(['/list-movies', this.selectedCategory, {'page': this.currentPage}]);
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

  /**
   * Checks the size of the screen
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
   * subscribes to the shared 'TdMediaService' to detect changes on the size of the screen
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
    this._loadingService.register('movies');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movies');
  }
}
