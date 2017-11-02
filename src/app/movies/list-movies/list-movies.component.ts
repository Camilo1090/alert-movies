import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

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
  providers: [ MoviesService ],
  encapsulation: ViewEncapsulation.None
})
export class ListMoviesComponent implements OnInit, OnDestroy {

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
  event: IPageChangeEvent;
  firstLast = true;
  pageSizeAll = false;
  pageLinkCount: number;
  totalPages: number;

  response = [];
  movies = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(private moviesService: MoviesService,
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

  onCategoryChanged(newValue: string): void {
    this.selectedCategory = newValue;
    this.updateMovies(1);
  }

  updateMovies(page: number): void {
    switch (this.selectedCategory) {
      case 'popular': {
        this.moviesService.getPopularMovies(page).subscribe(response => {
          this.response = response;
          this.movies = response['results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        });
        break;
      }
      case 'now': {
        this.moviesService.getPlayingNowMovies(page).subscribe(response => {
          this.response = response;
          this.movies = response['results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        });
        break;
      }
      case 'upcoming': {
        this.moviesService.getUpcomingMovies(page).subscribe(response => {
          this.response = response;
          this.movies = response['results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        });
        break;
      }
      case 'top': {
        this.moviesService.getTopRatedMovies(page).subscribe(response => {
          this.response = response;
          this.movies = response['results'];
          this.totalPages = response['total_pages'];
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
    // this.columns = 4;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 1;
        this.isDesktop = false;
        this.pageLinkCount = 1;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 2;
        this.isDesktop = false;
        this.pageLinkCount = 1;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 3;
        this.isDesktop = true;
        this.pageLinkCount = 5;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 4;
        this.isDesktop = true;
        this.pageLinkCount = 5;
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
          this.pageLinkCount = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
          this.isDesktop = false;
          this.pageLinkCount = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
          this.isDesktop = true;
          this.pageLinkCount = 5;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
          this.isDesktop = true;
          this.pageLinkCount = 5;
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
  changePage(event: IPageChangeEvent): void {
    this.event = event;
    this.registerLoading();
    this.updateMovies(event.page);
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
