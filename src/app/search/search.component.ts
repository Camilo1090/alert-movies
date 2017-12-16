import {Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import { IPageChangeEvent, TdPagingBarComponent } from '@covalent/core';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load shared
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../shared/api/api';
import { MOVIE_GENRES } from '../shared/api/genres';

// services
import { SearchService } from './shared/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ TdMediaService ],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  // Used for responsive services
  isDesktop = false;
  columns: number;
  columnsPeople: number;
  private _querySubscription: Subscription;
  ready = false;

  // search
  media = 'movie';
  query = '';

  // Used for the pagination
  firstLast = true;
  totalPages: number;
  totalResults: number;
  totalMovies = 0;
  totalSeries = 0;
  totalPeople = 0;
  currentPage = 1;

  results = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(public searchService: SearchService,
              private route: ActivatedRoute,
              public router: Router,
              public _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ready = false;
      if (params['media']) {
        this.media = params['media'];
      } else {
        this.media = 'movie';
      }
      if (params['query']) {
        this.query = params['query'];
      } else {
        this.query = '';
      }
      if (params['page']) {
        this.currentPage = params['page'];
      } else {
        this.currentPage = 1;
      }
      this.updateSearchResults();
    });

    this.checkScreen();
    this.watchScreen();
  }

  // updates search results according to query term and media type
  updateSearchResults(): void {
    if (this.query !== '') {
      switch (this.media) {
        case 'movie': {
          this.searchService.searchMovies(this.query, this.currentPage).subscribe(response => {
            this.results = response['results'];
            this.totalMovies = response['total_results'] <= 20000 ? response['total_results'] : 20000;
            this.totalResults = this.totalMovies;
            this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
            // this.resolveLoading();
            this.ready = true;
          }, err => {
            console.log(err);
          });
          this.searchService.searchSeries(this.query, this.currentPage).subscribe(response => {
            this.totalSeries = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          }, err => {
            console.log(err);
          });
          this.searchService.searchPeople(this.query, this.currentPage).subscribe(response => {
            this.totalPeople = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          }, err => {
            console.log(err);
          });
        }
          break;
        case 'series': {
          this.searchService.searchSeries(this.query, this.currentPage).subscribe(response => {
            this.results = response['results'];
            this.totalSeries = response['total_results'] <= 20000 ? response['total_results'] : 20000;
            this.totalResults = this.totalSeries;
            this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
            // this.resolveLoading();
            this.ready = true;
          }, err => {
            console.log(err);
          });
          this.searchService.searchMovies(this.query, this.currentPage).subscribe(response => {
            this.totalMovies = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          }, err => {
            console.log(err);
          });
          this.searchService.searchPeople(this.query, this.currentPage).subscribe(response => {
            this.totalPeople = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          }, err => {
            console.log(err);
          });
        }
          break;
        case 'person': {
          this.searchService.searchPeople(this.query, this.currentPage).subscribe(response => {
            this.results = response['results'];
            this.totalPeople = response['total_results'] <= 20000 ? response['total_results'] : 20000;
            this.totalResults = this.totalPeople;
            this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
            // this.resolveLoading();
            this.ready = true;
          }, err => {
            console.log(err);
          });
          this.searchService.searchMovies(this.query, this.currentPage).subscribe(response => {
            this.totalMovies = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          }, err => {
            console.log(err);
          });
          this.searchService.searchSeries(this.query, this.currentPage).subscribe(response => {
            this.totalSeries = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          }, err => {
            console.log(err);
          });
        }
      }
    } else {
      this.results = [];
      this.ready = true;
    }
  }

  /**
   * manages the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.router.navigate(['/search', this.media, {'query': this.query, 'page': this.currentPage}]);
    // window.scrollTo(0, 0);
    // this.updateSearchResults();
  }

  // changes to movie media type when clicked
  onMoviesClick() {
    if (this.pagingBar) {
      this.pagingBar.navigateToPage(1);
    }
    if (this.media !== 'movie') {
      this.router.navigate(['/search', 'movie', {'query': this.query, 'page': 1}]);
    }
  }

  // changes to series media type when clicked
  onSeriesClick() {
    if (this.pagingBar) {
      this.pagingBar.navigateToPage(1);
    }
    if (this.media !== 'series') {
      this.router.navigate(['/search', 'series', {'query': this.query, 'page': 1}]);
    }
  }

  // changes to person media type when clicked
  onPeopleClick() {
    if (this.pagingBar) {
      this.pagingBar.navigateToPage(1);
    }
    if (this.media !== 'person') {
      this.router.navigate(['/search', 'person', {'query': this.query, 'page': 1}]);
    }
  }

  // gets the first credit of a person to display in card
  getKnownFor(person: any): string {
    let result = '';
    if (person['known_for'] && person['known_for'].length > 0) {
      if (person['known_for'][0]['media_type'] === 'movie') {
        result = person['known_for'][0]['title'];
      } else {
        result = person['known_for'][0]['name'];
      }
    }
    return result;
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  /**
   * Check the size of the screen
   */
  checkScreen(): void {
    // this.columns = 5;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 1;
        this.columnsPeople = 2;
        this.isDesktop = false;
      }
      if (this._mediaService.query('(max-width: 375px)')) {
        this.columns = 1;
        this.columnsPeople = 1;
        this.isDesktop = false;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 2;
        this.columnsPeople = 3;
        this.isDesktop = false;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 3;
        this.columnsPeople = 4;
        this.isDesktop = true;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 4;
        this.columnsPeople = 5;
        this.isDesktop = true;
      }
    });
  }

  /**
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 5;
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 1;
          this.columnsPeople = 2;
          this.isDesktop = false;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('(max-width: 375px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 1;
          this.columnsPeople = 1;
          this.isDesktop = false;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
          this.columnsPeople = 3;
          this.isDesktop = false;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
          this.columnsPeople = 4;
          this.isDesktop = true;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
          this.columnsPeople = 5;
          this.isDesktop = true;
        }
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('search');
  }

  resolveLoading(): void {
    this._loadingService.resolve('search');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('search', value);
  }

}
