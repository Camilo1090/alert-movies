import {Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TdChipsComponent, TdMediaService, TdPagingBarComponent} from '@covalent/core';

// pagination
import { Subscription } from 'rxjs/Subscription';
import { IPageChangeEvent } from '@covalent/core';

// Load shared
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../shared/api/api';
import { MOVIE_GENRES, SERIES_GENRES } from '../shared/api/genres';
import { YEARS } from '../shared/api/years';

// services
import { DiscoverService } from './shared/discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  providers: [ DiscoverService, TdMediaService ],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  // Used for responsive services
  isDesktop = true;
  columns: number;
  filter = false;
  private _querySubscription: Subscription;

  // categories
  selectedCategory = 'movies';
  categories = [
    {
      value: 'movies',
      viewValue: 'Movies'
    },
    {
      value: 'series',
      viewValue: 'TV Series'
    }
  ];

  // year
  selectedYear = 0;
  years = YEARS;

  // sort
  selectedSort = 'popularity.desc';
  sorts = [
    {
      value: 'popularity.desc',
      view: 'Popularity Descending'
    },
    {
      value: 'popularity.asc',
      view: 'Popularity Ascending'
    },
    {
      value: 'vote_average.desc',
      view: 'Rating Descending'
    },
    {
      value: 'vote_average.asc',
      view: 'Rating Ascending'
    },
    {
      value: 'release_date.desc',
      view: 'Release Date Descending'
    },
    {
      value: 'release_date.asc',
      view: 'Release Date Ascending'
    },
    {
      value: 'original_title.asc',
      view: 'Title (A-Z)'
    },
    {
      value: 'original_title.desc',
      view: 'Title (Z-A)'
    },
  ];

  // genres
  genres = [];
  genresModel = [];
  filteredGenres = [];
  genresInputValue = '';
  genresInputPlaceholder = 'Filter by genres...';

  // Used for the pagination
  currentPage: number;
  firstLast = true;
  totalResults: number;
  totalPages: number;

  results = [];
  params = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(private discoverService: DiscoverService,
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
        this.selectedCategory = 'movies';
      }
      if (params['page']) {
        this.currentPage = params['page'];
      } else {
        this.currentPage = 1;
      }
      this.updateResults();
    });

    this.updateGenres();
    this.filterGenres('');
    this.checkScreen();
    this.watchScreen();
  }

  updateResults(): void {
    switch (this.selectedCategory) {
      case 'movies': {
        this.discoverService.getDiscoverMovies(this.currentPage, this.params).subscribe(response => {
          if (response['results']) {
            this.results = response['results'];
          } else {
            this.results = [];
          }
          this.totalResults = response['total_results'];
          this.totalPages = response['total_pages'];
          this.resolveMoviesLoading();
        }, err => {
          console.log(err);
        });
      } break;
      case 'series': {
        this.discoverService.getDiscoverSeries(this.currentPage, this.params).subscribe(response => {
          if (response['results']) {
            this.results = response['results'];
          } else {
            this.results = [];
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

  updateParams(): void {
    this.params = [];
    if (this.selectedYear !== 0) {
      this.params.push({name: 'primary_release_year', value: this.selectedYear});
    }
    this.params.push({name: 'sort_by', value: this.selectedSort});
    if (this.genresModel.length > 0) {
      let values = '';
      for (let i = 0; i < this.genresModel.length; i++) {
        values += this.genresModel[i].id + ',';
      }
      this.params.push({name: 'with_genres', value: values});
    }
  }

  updateGenres() {
    this.genres = [];
    switch (this.selectedCategory) {
      case 'movies': {
        for (const key in MOVIE_GENRES) {
          this.genres.push({id: key, name: MOVIE_GENRES[key]});
        }
        this.genres.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else {
            return 1;
          }
        });
      } break;
      case 'series': {
        for (const key in SERIES_GENRES) {
          this.genres.push({id: key, name: SERIES_GENRES[key]});
        }
      } break;
    }
  }

  filterGenres(value: string) {
    this.filteredGenres = this.genres.filter((obj: any) => {
      if (value) {
        return obj.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
      } else {
        return false;
      }
    }).filter((filteredObj: any) => {
      return this.genresModel ? this.genresModel.indexOf(filteredObj) < 0 : true;
    });
  }

  showAllGenres() {
    this.filteredGenres = this.genres.filter((filteredObj: any) => {
      return this.genresModel ? this.genresModel.indexOf(filteredObj) < 0 : true;
    });
  }

  updateGenresInputSize(value: string) {
    const input = document.getElementsByClassName('mat-form-field-type-mat-input')[2];
    // input.setAttribute('style', 'width:' + ((value.length * 8) + 25) + 'px !important;');
    // console.log(input);
  }

  onGenresInputChanged(value: string) {
    // this.updateGenresInputSize(value);
    this.filterGenres(value);
  }

  onFocusIn() {
    this.genresInputPlaceholder = '';
    // if (this.genresInputValue.length === 0) {
    //   this.updateGenresInputSize(this.genresInputPlaceholder);
    // } else {
    //   this.updateGenresInputSize(this.genresInputValue);
    // }
  }

  onFocusOut() {
    if (this.genresModel.length === 0) {
      this.genresInputPlaceholder = 'Filter by genres...';
      // if (this.genresInputValue.length === 0) {
      //   this.updateGenresInputSize(this.genresInputPlaceholder);
      // } else {
      //   this.updateGenresInputSize(this.genresInputValue);
      // }
    }
  }

  onCategoryChanged(): void {
    this.genresModel = [];
    this.updateGenres();
    this.pagingBar.navigateToPage(1);
    // this.router.navigate(['/list-movies', {'category': this.selectedCategory, 'page': 1}]);
  }

  onFilterOptionsChanged() {
    this.updateParams();
    this.updateResults();
  }

  /**
   * In charge to manage the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.router.navigate(['/discover', {'category': this.selectedCategory, 'page': this.currentPage}]);
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
        this.filter = false;
      }
      if (this._mediaService.query('(max-width: 740px)')) {
        this.filter = true;
      }
      if (this._mediaService.query('(min-width: 741px)')) {
        this.filter = false;
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
            this.filter = false;
          }
        });
      });
    this._querySubscription = this._mediaService.registerQuery('(max-width: 740px)')
      .subscribe((matches: boolean) => {
        this._ngZone.run(() => {
          if (matches) {
            this.filter = true;
          }
        });
      });
    this._querySubscription = this._mediaService.registerQuery('(min-width: 741px)')
      .subscribe((matches: boolean) => {
        this._ngZone.run(() => {
          if (matches) {
            this.filter = false;
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

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('discover');
  }

  resolveMoviesLoading(): void {
    this._loadingService.resolve('discover');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('discover', value);
  }
}
