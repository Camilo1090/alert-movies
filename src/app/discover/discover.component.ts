import { Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdMediaService, TdPagingBarComponent} from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// pagination
import { IPageChangeEvent } from '@covalent/core';

// Loading service
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
  encapsulation: ViewEncapsulation.None
})
export class DiscoverComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  // Used for responsive services
  columns: number;
  filter = false;
  _querySubscription: Subscription;

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
  genresInputPlaceholder = 'Filter by genres...';

  // Used for the pagination
  currentPage = 1;
  firstLast = true;
  totalResults: number;
  totalPages: number;

  results = [];
  params = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(public discoverService: DiscoverService,
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
        if (params['category'] !== this.selectedCategory) {
          this.selectedCategory = params['category'];
          this.updateGenres();
          this.filterGenres('');
        }
      } else {
        this.selectedCategory = 'movies';
      }
      if (params['page']) {
        if (params['page'] <= 1000) {
          this.currentPage = params['page'];
        } else {
          this.router.navigate(['/discover', this.selectedCategory, {'page': 1}]);
        }
      } else {
        this.currentPage = 1;
      }
      if (params['primary_release_year']) {
        this.selectedYear = +params['primary_release_year'];
      } else if (params['first_air_date_year']) {
        this.selectedYear = +params['first_air_date_year'];
      } else {
        this.selectedYear = 0;
      }
      if (params['sort_by']) {
        this.selectedSort = params['sort_by'];
      } else {
        this.selectedSort = 'popularity.desc';
      }
      // if (params['with_genres']) {
      //   this.genresModel = [];
      //   const paramGenres = params['with_genres'].split(',');
      //   if (this.selectedCategory === 'movies') {
      //     for (let i = 0; i < paramGenres.length; i++) {
      //       this.genresModel.push({id: +paramGenres[i], name: MOVIE_GENRES[+paramGenres[i]]});
      //     }
      //   } else {
      //     for (let i = 0; i < paramGenres.length; i++) {
      //       this.genresModel.push({id: +paramGenres[i], name: SERIES_GENRES[+paramGenres[i]]});
      //     }
      //   }
      //   this.filterGenres('');
      // } else {
      //   this.genresModel = [];
      // }
      this.updateParams();
      this.updateResults();
    });
    this.updateGenres();
    this.filterGenres('');
    this.checkScreen();
    this.watchScreen();
  }

  // updates results according to params
  updateResults(): void {
    switch (this.selectedCategory) {
      case 'movies': {
        this.discoverService.getDiscoverMovies(this.currentPage, this.params).subscribe(response => {
          if (response['results']) {
            this.results = response['results'];
          }
          this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
          this.resolveLoading();
        }, err => {
          if (err['status'] === 500) {
            this.router.navigate(['/discover']);
          }
          console.log(err);
          this.resolveLoading();
        });
      } break;
      case 'series': {
        this.discoverService.getDiscoverSeries(this.currentPage, this.params).subscribe(response => {
          if (response['results']) {
            this.results = response['results'];
          }
          this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
          this.resolveLoading();
        }, err => {
          if (err['status'] === 500) {
            this.router.navigate(['/discover']);
          }
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

  // updates params dictionary when changed in app
  updateParams(): void {
    this.params = [];
    this.params.push({name: 'vote_count.gte', value: 0});
    this.params.push({name: 'sort_by', value: this.selectedSort});
    if (this.genresModel.length > 0) {
      let values = '';
      for (let i = 0; i < this.genresModel.length - 1; i++) {
        values += this.genresModel[i].id + ',';
      }
      values += this.genresModel[this.genresModel.length - 1].id;
      this.params.push({name: 'with_genres', value: values});
    }
    if (this.selectedCategory === 'movies') {
      this.params.push({name: 'primary_release_year', value: this.selectedYear});
    } else {
      this.params.push({name: 'first_air_date_year', value: this.selectedYear});
    }
  }

  // updates available genres according to media category (movies, series)
  updateGenres(): void {
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

  // filters genres autocomplete according to user input
  filterGenres(value: string): void {
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

  showAllGenres(): void {
    this.filteredGenres = this.genres.filter((filteredObj: any) => {
      return this.genresModel ? this.genresModel.indexOf(filteredObj) < 0 : true;
    });
  }

  // event handler for genres input changed
  onGenresInputChanged(value: string): void {
    // this.updateGenresInputSize(value);
    this.filterGenres(value);
  }

  onFocusIn(): void {
    this.genresInputPlaceholder = '';
    // if (this.genresInputValue.length === 0) {
    //   this.updateGenresInputSize(this.genresInputPlaceholder);
    // } else {
    //   this.updateGenresInputSize(this.genresInputValue);
    // }
  }

  onFocusOut(): void {
    if (this.genresModel.length === 0) {
      this.genresInputPlaceholder = 'Filter by genres...';
      // if (this.genresInputValue.length === 0) {
      //   this.updateGenresInputSize(this.genresInputPlaceholder);
      // } else {
      //   this.updateGenresInputSize(this.genresInputValue);
      // }
    }
  }

  // event handler for category select
  onCategoryChanged(): void {
    this.genresModel = [];
    this.genresInputPlaceholder = 'Filter by genres...';
    this.updateGenres();
    this.updateParams();
    if (this.pagingBar) {
      this.pagingBar.navigateToPage(1);
    } else {
      const routeParams = this.getRouteParams();
      routeParams['page'] = 1;
      this.router.navigate(['/discover', this.selectedCategory, routeParams]);
    }
  }

  // event handler for filter options
  onFilterOptionsChanged(): void {
    this.updateParams();
    if (this.pagingBar) {
      this.updateResults();
      this.pagingBar.navigateToPage(1);
    } else {
      const routeParams = this.getRouteParams();
      routeParams['page'] = 1;
      this.router.navigate(['/discover', this.selectedCategory, routeParams]);
    }
  }

  /**
   * event handler for pagination component page changed
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.router.navigate(['/discover', this.selectedCategory, this.getRouteParams()]);
  }

  getRouteParams(): {[param: string]: any} {
    const routeParams = {};

    routeParams['page'] = this.currentPage;
    for (let i = 0; i < this.params.length; i++) {
      // remove if when with_genres is supported by GET url parameter
      if (this.params[i].name !== 'with_genres') {
        routeParams[this.params[i].name] = this.params[i].value;
      }
    }

    return routeParams;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

  /**
   * Check the size of the screen
   */
  checkScreen(): void {
    // this.columns = 4;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 1;
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
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 4;
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)')
      .subscribe((matches: boolean) => {
        this._ngZone.run(() => {
          if (matches) {
            this.columns = 1;
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
    this._loadingService.register('discover');
  }

  resolveLoading(): void {
    this._loadingService.resolve('discover');
  }
}
