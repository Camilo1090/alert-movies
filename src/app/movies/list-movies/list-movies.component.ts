import {Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TdMediaService, TdPagingBarComponent} from '@covalent/core';

// pagination
import { Subscription } from 'rxjs/Subscription';
import { IPageChangeEvent } from '@covalent/core';

// Load shared
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../../shared/api/api';
import { GENRES } from '../../shared/api/genres';

// services
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
  providers: [ MoviesService, TdMediaService ],
  encapsulation: ViewEncapsulation.None
})
export class ListMoviesComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  // Used for responsive services
  isDesktop = true;
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

  // Used for the pagination
  currentPage: number;
  firstLast = true;
  totalResults: number;
  totalPages: number;

  response = [];
  movies = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.registerLoading();
      // console.log(params);
      if (params['category']) {
        this.selectedCategory = params['category'];
      } else {
        this.selectedCategory = 'popular';
      }
      if (params['page']) {
        this.currentPage = params['page'];
      } else {
        this.currentPage = 1;
      }
      this.updateMovies();
    });

    this.checkScreen();
    this.watchScreen();
  }

  updateMovies(): void {
    switch (this.selectedCategory) {
      case 'popular': {
        this.moviesService.getPopularMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          } else {
            this.movies = [];
          }
          this.totalResults = response['total_results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        }, err => {
          console.log(err);
        });
      } break;
      case 'now': {
        this.moviesService.getPlayingNowMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          } else {
            this.movies = [];
          }
          this.totalResults = response['total_results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        }, err => {
          console.log(err);
        });
      } break;
      case 'upcoming': {
        this.moviesService.getUpcomingMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          } else {
            this.movies = [];
          }
          this.totalResults = response['total_results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        }, err => {
          console.log(err);
        });
      } break;
      case 'top': {
        this.moviesService.getTopRatedMovies(this.currentPage).subscribe(response => {
          if (response['results']) {
            this.movies = response['results'];
          } else {
            this.movies = [];
          }
          this.totalResults = response['total_results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        }, err => {
          console.log(err);
        });
      } break;
    }
  }

  onCategoryChanged(newValue: string): void {
    this.selectedCategory = newValue;
    this.pagingBar.navigateToPage(1);
    // this.router.navigate(['/list-movies', {'category': this.selectedCategory, 'page': 1}]);
  }

  /**
   * In charge to manage the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.router.navigate(['/list-movies', {'category': this.selectedCategory, 'page': this.currentPage}]);
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
        this.isDesktop = false;
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
          this.isDesktop = false;
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

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movies');
  }

  resolveMoviesLoading(): void {
    this._loadingService.resolve('movies');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('movies', value);
  }
}
