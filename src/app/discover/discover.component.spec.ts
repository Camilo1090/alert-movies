import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { Dir } from '@angular/cdk/bidi';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  CovalentChipsModule, CovalentLayoutModule, CovalentLoadingModule, CovalentMediaModule, CovalentMenuModule,
  CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule, IPageChangeEvent, TdMediaService,
  TdPagingBarComponent
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as movies from '../testing/movies.json';
import * as series from '../testing/series.json';
import * as discover from '../testing/discover.json';

import { TrendingComponent } from '../trending/trending.component';
import { ListMoviesComponent } from '../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from '../people/list-people/list-people.component';
import { ListSeriesComponent } from '../series/list-series/list-series.component';
import { FooterComponent } from '../footer/footer.component';
import { MovieImagesComponent } from '../movies/movie-images/movie-images.component';
import { MovieVideosComponent } from '../movies/movie-videos/movie-videos.component';
import { MovieCastComponent } from '../movies/movie-cast/movie-cast.component';
import { MovieReviewsComponent } from '../movies/movie-reviews/movie-reviews.component';
import { MovieRecommendationsComponent } from '../movies/movie-recommendations/movie-recommendations.component';
import { SeriesDetailsComponent } from '../series/series-details/series-details.component';
import { SeriesImagesComponent } from '../series/series-images/series-images.component';
import { SeriesVideosComponent } from '../series/series-videos/series-videos.component';
import { FormatStringPipe } from '../shared/format-string/format-string.pipe';
import { SeriesCastComponent } from '../series/series-cast/series-cast.component';
import { SeriesRecommendationsComponent } from '../series/series-recommendations/series-recommendations.component';
import { PersonDetailsComponent } from '../people/person-details/person-details.component';
import { PersonMoviesComponent } from '../people/person-movies/person-movies.component';
import { PersonSeriesComponent } from '../people/person-series/person-series.component';
import { PersonImagesComponent } from '../people/person-images/person-images.component';
import { SearchComponent } from '../search/search.component';
import { SearchBarComponent } from '../search/search-bar/search-bar.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { DiscoverComponent } from './discover.component';
import { CustomCardComponent } from '../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../shared/limit-text/limit-text.component';
import { API } from '../shared/api/api';
import { DiscoverService } from './shared/discover.service';
import { YEARS } from '../shared/api/years';


describe('Discover component test', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  // Spy creation

  // Discover service
  const getDiscoverMoviesSpy = jasmine.createSpy('getDiscoverMovies')
    .and.returnValue(Observable.of(movies));
  const getDiscoverSeriesSpy = jasmine.createSpy('getDiscoverSeries')
    .and.returnValue(Observable.of(series));

  // TdMediaQuery
  const mediaQuerySpy = jasmine.createSpy('query')
    .and.returnValue(false);
  const mediaRegisterQuerySpy = jasmine.createSpy('registerQuery')
    .and.returnValue(Observable.of(false));

  // Router
  const navigateSpy = jasmine.createSpy('navigate');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListMoviesComponent,
        FooterComponent,
        TrendingComponent,
        ListSeriesComponent,
        ListPeopleComponent,
        MovieDetailsComponent,
        ListPeopleComponent,
        MovieImagesComponent,
        MovieVideosComponent,
        MovieCastComponent,
        MovieReviewsComponent,
        MovieRecommendationsComponent,
        SeriesDetailsComponent,
        SeriesImagesComponent,
        SeriesVideosComponent,
        FormatStringPipe,
        SeriesCastComponent,
        SeriesRecommendationsComponent,
        PersonDetailsComponent,
        PersonMoviesComponent,
        PersonSeriesComponent,
        PersonImagesComponent,
        SearchComponent,
        SearchBarComponent,
        NotFoundComponent,
        DiscoverComponent,
        CustomCardComponent,
        LimitTextComponent
      ],
      imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        ModalGalleryModule.forRoot(),
        MatButtonModule,
        MatSidenavModule,
        MatTooltipModule,
        MatDialogModule,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTabsModule,
        MatToolbarModule,
        MatGridListModule,
        MatSelectModule,
        CovalentLayoutModule,
        CovalentMenuModule,
        CovalentSearchModule,
        CovalentHttpModule,
        CovalentMediaModule,
        CovalentPagingModule,
        CovalentLoadingModule,
        CovalentNotificationsModule,
        CovalentChipsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: DiscoverService, useClass: class {
            getDiscoverMovies = getDiscoverMoviesSpy;
            getDiscoverSeries = getDiscoverSeriesSpy;
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({})
          }
        },
        {
          provide: Router, useClass: class {
            navigate = navigateSpy;
          }
        },
        {
          provide: TdMediaService, useClass: class {
            query = mediaQuerySpy;
            registerQuery = mediaRegisterQuerySpy;
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();
      expect(component.pagingBar)
        .toBeUndefined();
      expect(component.columns)
        .toBeUndefined();
      expect(component.filter)
        .toBe(false);
      expect(component._querySubscription)
        .toBeUndefined();

      expect(component.selectedCategory)
        .toEqual('movies');
      expect(component.categories)
        .toEqual((<any>discover).categories);
      expect(component.selectedYear)
        .toEqual(0);
      expect(component.years)
        .toEqual(YEARS);
      expect(component.selectedSort)
        .toEqual('popularity.desc');
      expect(component.sorts)
        .toEqual((<any>discover).sorts);
      expect(component.genres)
        .toEqual([]);
      expect(component.genresModel)
        .toEqual([]);
      expect(component.filteredGenres)
        .toEqual([]);
      expect(component.genresInputPlaceholder)
        .toEqual('Filter by genres...');

      expect(component.currentPage)
        .toEqual(1);
      expect(component.firstLast)
        .toBe(true);
      expect(component.totalResults)
        .toBeUndefined();
      expect(component.totalPages)
        .toBeUndefined();

      expect(component.results)
        .toEqual([]);
      expect(component.params)
        .toEqual([]);
      expect(component.apiImg)
        .toEqual(API.apiImg + 'w500');
      expect(component.apiImgOrig)
        .toEqual(API.apiImg + 'original');
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    let values: Observable<Object>;
    let category: string;
    let page: number;
    let year: number;
    let sort: string;
    beforeEach(() => {
      spyOn(component, 'registerLoading').calls.reset();
      spyOn(component, 'updateParams').calls.reset();
      spyOn(component, 'updateResults').calls.reset();
      spyOn(component, 'updateGenres').calls.reset();
      spyOn(component, 'filterGenres').calls.reset();
      spyOn(component, 'checkScreen').calls.reset();
      spyOn(component, 'watchScreen').calls.reset();
    });
    it('SHOULD call functions', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.updateParams)
        .toHaveBeenCalledTimes(1);
      expect(component.updateResults)
        .toHaveBeenCalledTimes(1);
      expect(component.updateGenres)
        .toHaveBeenCalledTimes(1);
      expect(component.filterGenres)
        .toHaveBeenCalledTimes(1);
      expect(component.filterGenres)
        .toHaveBeenCalledWith('');
      expect(component.checkScreen)
        .toHaveBeenCalledTimes(1);
      expect(component.watchScreen)
        .toHaveBeenCalledTimes(1);
    }));
    it('SHOULD read param values', fakeAsync(() => {
      values = Observable.of({ category: 'series', page: 2, first_air_date_year: 2016, sort_by: 'rating.desc' });
      values.subscribe(params => {
        category = params['category'];
        page = params['page'];
        year = params['first_air_date_year'];
        sort = params['sort_by'];
      });
      component.route.params = values;
      component.ngOnInit();
      tick();

      expect(component.selectedCategory)
        .toEqual(category);
      expect(component.updateGenres)
        .toHaveBeenCalledTimes(2);
      expect(component.filterGenres)
        .toHaveBeenCalledTimes(2);
      expect(component.filterGenres)
        .toHaveBeenCalledWith('');
      expect(component.currentPage)
        .toEqual(page);
      expect(component.selectedYear)
        .toEqual(year);
      expect(component.selectedSort)
        .toEqual(sort);
    }));
    it('SHOULD navigate if page is gt 1000', fakeAsync(() => {
      values = Observable.of({ page: 1001, primary_release_year: 2015 });
      values.subscribe(params => {
        page = params['page'];
        year = params['primary_release_year'];
      });
      component.route.params = values;
      component.ngOnInit();
      tick();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/discover', component.selectedCategory, {'page': 1}]);
      expect(component.selectedYear)
        .toEqual(year);
    }));
    it('SHOULD set default values if no params', fakeAsync(() => {
      component.route.params = Observable.of({});
      component.ngOnInit();
      tick();

      expect(component.selectedCategory)
        .toEqual('movies');
      expect(component.currentPage)
        .toEqual(1);
      expect(component.selectedYear)
        .toEqual(0);
      expect(component.selectedSort)
        .toEqual('popularity.desc');
    }));
  });

  describe('WHEN updateResults function is called', () => {
    beforeEach(() => {
      getDiscoverMoviesSpy.calls.reset();
      getDiscoverSeriesSpy.calls.reset();
      navigateSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.currentPage = 1;
    });
    it('SHOULD call functions when category is movies', () => {
      component.selectedCategory = 'movies';
      component.updateResults();

      expect(component.discoverService.getDiscoverMovies)
        .toHaveBeenCalledTimes(1);
      expect(component.discoverService.getDiscoverMovies)
        .toHaveBeenCalledWith(component.currentPage, component.params);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set internal values when category is movies', () => {
      getDiscoverMoviesSpy.and.returnValue(Observable.of(movies));
      component.selectedCategory = 'movies';
      component.updateResults();

      expect(component.results)
        .toEqual((<any>movies).results);
      expect(component.totalResults)
        .toEqual((<any>movies).total_results);
      expect(component.totalPages)
        .toEqual((<any>movies).total_pages);
    });
    it('SHOULD handle error if observable throws error', () => {
      getDiscoverMoviesSpy.and.returnValue(Observable.throw({ status: 500 }));
      component.selectedCategory = 'movies';
      component.updateResults();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/discover']);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call functions when category is series', () => {
      component.selectedCategory = 'series';
      component.updateResults();

      expect(component.discoverService.getDiscoverSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.discoverService.getDiscoverSeries)
        .toHaveBeenCalledWith(component.currentPage, component.params);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set internal values when category is series', () => {
      getDiscoverSeriesSpy.and.returnValue(Observable.of(series));
      component.selectedCategory = 'series';
      component.updateResults();

      expect(component.results)
        .toEqual((<any>series).results);
      expect(component.totalResults)
        .toEqual((<any>series).total_results);
      expect(component.totalPages)
        .toEqual((<any>series).total_pages);
    });
    it('SHOULD handle error if observable throws error', () => {
      getDiscoverSeriesSpy.and.returnValue(Observable.throw({ status: 500 }));
      component.selectedCategory = 'series';
      component.updateResults();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/discover']);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD navigate if category not movies nor series', () => {
      component.selectedCategory = 'invalid-category';
      component.updateResults();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/404']);
    });
  });

  describe('WHEN updateParams function is called', () => {
    let params: Object[];
    let year: number;
    let genresModel: Object[];
    let sort: string;
    beforeEach(() => {
      year = 2015;
      genresModel = [{ id: 12 }, { id: 20 }];
      sort = 'rating.desc';
      params = [{
        name: 'vote_count.gte', value: 0
      }, {
        name: 'sort_by', value: sort
      }, {
        name: 'with_genres', value: '12,20'
      }];

      component.selectedYear = year;
      component.genresModel = genresModel;
      component.selectedSort = sort;
    });
    it('SHOULD build params array when category is movies', () => {
      component.selectedCategory = 'movies';
      params.push({ name: 'primary_release_year', value: year });
      component.updateParams();

      expect(component.params)
        .toEqual(params);
    });
    it('SHOULD build params array when category is series', () => {
      component.selectedCategory = 'series';
      params.push({ name: 'first_air_date_year', value: year });
      component.updateParams();

      expect(component.params)
        .toEqual(params);
    });
  });

  describe('WHEN updateGenres function is called', () => {
    it('SHOULD build genres array when category is movies', () => {
      component.selectedCategory = 'movies';
      component.updateGenres();

      expect(component.genres)
        .not.toEqual([]);
      expect(component.genres)
        .toContain(jasmine.objectContaining({ id: '28', name: 'Action' }));
      expect(component.genres)
        .not.toContain(jasmine.objectContaining({ id: '10759', name: 'Action & Adventure' }));
    });
    it('SHOULD build genres array when category is series', () => {
      component.selectedCategory = 'series';
      component.updateGenres();

      expect(component.genres)
        .not.toEqual([]);
      expect(component.genres)
        .not.toContain(jasmine.objectContaining({ id: '28', name: 'Action' }));
      expect(component.genres)
        .toContain(jasmine.objectContaining({ id: '10759', name: 'Action & Adventure' }));
    });
  });

  describe('WHEN filterGenres function is called', () => {
    let value: string;
    let genres: Object[];
    beforeEach(() => {
      genres = [{ name: 'action' }, { name: 'comedy' }];
      component.genres = genres;
      component.filteredGenres = [];
    });
    it('SHOULD build filteredGenres array according to input value', () => {
      value = 'ac';
      component.filterGenres(value);

      expect(component.filteredGenres)
        .toContain(jasmine.objectContaining({ name: 'action' }));
      expect(component.filteredGenres)
        .not.toContain(jasmine.objectContaining({ name: 'comedy' }));
    });
    it('SHOULD build filteredGenres array according to input value', () => {
      value = undefined;
      component.filterGenres(value);

      expect(component.filteredGenres)
        .toEqual([]);
    });
    it('SHOULD not build filteredGenres array with values already in genresModel', () => {
      value = 'ac';
      component.genresModel = [genres[0]];
      component.filterGenres(value);

      expect(component.filteredGenres)
        .toEqual([]);
    });
  });

  describe('WHEN showAllGenres function is called', () => {
    let genres: Object[];
    let genresModel: Object[];
    beforeEach(() => {
      genres = [{ name: 'action' }, { name: 'comedy' }, { name: 'suspense' }];
      genresModel = [];
      genresModel.push(genres[0], genres[2]);
      component.genres = genres;
      component.genresModel = genresModel;
      component.filteredGenres = [];
    });
    it('SHOULD build filteredGenres without those in genresModel', () => {
      component.showAllGenres();

      expect(component.filteredGenres)
        .toContain(jasmine.objectContaining({ name: 'comedy' }));
      expect(component.filteredGenres)
        .not.toContain(jasmine.objectContaining({ name: 'action' }));
      expect(component.filteredGenres)
        .not.toContain(jasmine.objectContaining({ name: 'suspense' }));
    });
  });

  describe('WHEN onGenresInputChanged function is called', () => {
    let value: string;
    beforeEach(() => {
      value = 'input';
      spyOn(component, 'filterGenres');
    });
    it('SHOULD call functions', () => {
      component.onGenresInputChanged(value);

      expect(component.filterGenres)
        .toHaveBeenCalledTimes(1);
      expect(component.filterGenres)
        .toHaveBeenCalledWith(value);
    });
  });

  describe('WHEN onFocusIn function is called', () => {
    it('SHOULD set values', () => {
      component.onFocusIn();

      expect(component.genresInputPlaceholder)
        .toEqual('');
    });
  });

  describe('WHEN onFocusOut function is called', () => {
    beforeEach(() => {
      component.genresInputPlaceholder = '';
    });
    it('SHOULD set values', () => {
      component.genresModel = [];
      component.onFocusOut();

      expect(component.genresInputPlaceholder)
        .toEqual('Filter by genres...');
    });
    it('SHOULD not set values', () => {
      component.genresModel = [{ name: 'action' }];
      component.onFocusOut();

      expect(component.genresInputPlaceholder)
        .toEqual('');
    });
  });

  describe('WHEN onCategoryChanged function is called', () => {
    beforeEach(() => {
      navigateSpy.calls.reset();
      spyOn(component, 'updateGenres').calls.reset();
      spyOn(component, 'updateParams').calls.reset();
    });
    it('SHOULD navigate to page 1 if there is a paging bar', () => {
      component.pagingBar = new TdPagingBarComponent(new Dir());
      spyOn(component.pagingBar, 'navigateToPage');
      component.onCategoryChanged();

      expect(component.genresModel)
        .toEqual([]);
      expect(component.genresInputPlaceholder)
        .toEqual('Filter by genres...');
      expect(component.updateGenres)
        .toHaveBeenCalledTimes(1);
      expect(component.updateParams)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledWith(1);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
    it('SHOULD route navigate if there is no paging bar', () => {
      component.pagingBar = undefined;
      spyOn(component, 'getRouteParams').and.returnValue({});
      component.onCategoryChanged();

      expect(component.genresModel)
        .toEqual([]);
      expect(component.genresInputPlaceholder)
        .toEqual('Filter by genres...');
      expect(component.updateGenres)
        .toHaveBeenCalledTimes(1);
      expect(component.updateParams)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/discover', component.selectedCategory, { page: 1 }]);
    });
  });

  describe('WHEN onFilterOptionsChanged function is called', () => {
    beforeEach(() => {
      navigateSpy.calls.reset();
      spyOn(component, 'updateParams').calls.reset();
      spyOn(component, 'updateResults').calls.reset();
    });
    it('SHOULD navigate to page 1 if there is a paging bar', () => {
      component.pagingBar = new TdPagingBarComponent(new Dir());
      spyOn(component.pagingBar, 'navigateToPage');
      component.onFilterOptionsChanged();

      expect(component.updateParams)
        .toHaveBeenCalledTimes(1);
      expect(component.updateResults)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledWith(1);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
    it('SHOULD route navigate if there is no paging bar', () => {
      component.pagingBar = undefined;
      spyOn(component, 'getRouteParams').and.returnValue({});
      component.onFilterOptionsChanged();

      expect(component.updateParams)
        .toHaveBeenCalledTimes(1);
      expect(component.updateResults)
        .toHaveBeenCalledTimes(0);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/discover', component.selectedCategory, { page: 1 }]);
    });
  });

  describe('WHEN changePage function is called', () => {
    let event: IPageChangeEvent;
    beforeEach(() => {
      event = {
        page: 1,
        maxPage: 1,
        pageSize: 20,
        total: 1,
        fromRow: 1,
        toRow: 1
      };
      navigateSpy.calls.reset();
    });
    it('SHOULD set internal values and call internal functions', () => {
      spyOn(component, 'getRouteParams').and.returnValue({});
      component.changePage(event);

      expect(component.currentPage)
        .toEqual(event.page);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/discover', component.selectedCategory, {}]);
    });
  });

  describe('WHEN getRouteParams function is called', () => {
    let routeParams: {[param: string]: any};
    beforeEach(() => {
      routeParams = {
        'page': 1,
        'sort_by': 'rating.desc'
      };
      component.params = [{ name: 'sort_by', value: 'rating.desc' }];
    });
    it('SHOULD return the current filters as an array of params', () => {
      expect(component.getRouteParams())
        .toEqual(jasmine.objectContaining(routeParams));
    });
  });

  describe('WHEN checkScreen function is called', () => {
    beforeEach(() => {
      spyOn(component._ngZone, 'run').and.callFake(fn => fn());
      mediaQuerySpy.calls.reset();
      component.columns = undefined;
    });
    it('SHOULD call internal functions', () => {
      component.checkScreen();

      expect(component._ngZone.run)
        .toHaveBeenCalledTimes(1);
      expect(component._mediaService.query)
        .toHaveBeenCalledTimes(6);
    });
    it('SHOULD set internal values when query is (max-width: 600px)', () => {
      mediaQuerySpy.and.callFake((query: string) => query === '(max-width: 600px)');
      component.checkScreen();

      expect(component.columns)
        .toEqual(1);
      expect(component.filter)
        .toBe(false);
    });
    it('SHOULD set internal values when query is (max-width: 740px)', () => {
      mediaQuerySpy.and.callFake((query: string) => query === '(max-width: 740px)');
      component.checkScreen();

      expect(component.columns)
        .toBeUndefined();
      expect(component.filter)
        .toBe(true);
    });
    it('SHOULD set internal values when query is (min-width: 741px)', () => {
      mediaQuerySpy.and.callFake((query: string) => query === '(min-width: 741px)');
      component.checkScreen();

      expect(component.columns)
        .toBeUndefined();
      expect(component.filter)
        .toBe(false);
    });
    it('SHOULD set internal values when query is gt-xs', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-xs');
      component.checkScreen();

      expect(component.columns)
        .toEqual(2);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-sm');
      component.checkScreen();

      expect(component.columns)
        .toEqual(3);
    });
    it('SHOULD set internal values when query is gt-md', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-md');
      component.checkScreen();

      expect(component.columns)
        .toEqual(4);
    });
  });

  describe('WHEN watchScreen function is called', () => {
    beforeEach(() => {
      spyOn(component._ngZone, 'run').and.callFake(fn => fn());
      mediaRegisterQuerySpy.calls.reset();
      component.columns = undefined;
    });
    it('SHOULD call internal functions', () => {
      component.watchScreen();

      expect(component._mediaService.registerQuery)
        .toHaveBeenCalledTimes(6);
      expect(component._ngZone.run)
        .toHaveBeenCalledTimes(6);
    });
    it('SHOULD set internal values when query is (max-width: 600px)', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === '(max-width: 600px)') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(1);
      expect(component.filter)
        .toBe(false);
    });
    it('SHOULD set internal values when query is (max-width: 740px)', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === '(max-width: 740px)') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toBeUndefined();
      expect(component.filter)
        .toBe(true);
    });
    it('SHOULD set internal values when query is (min-width: 741px)', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === '(min-width: 741px)') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toBeUndefined();
      expect(component.filter)
        .toBe(false);
    });
    it('SHOULD set internal values when query is gt-xs', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === 'gt-xs') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(2);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === 'gt-sm') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(3);
    });
    it('SHOULD set internal values when query is gt-md', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === 'gt-md') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(4);
    });
  });

  describe('WHEN registerLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'register');
      component.registerLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.register)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.register)
        .toHaveBeenCalledWith('discover');
    });
  });

  describe('WHEN resolveMoviesLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'resolve');
      component.resolveLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.resolve)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.resolve)
        .toHaveBeenCalledWith('discover');
    });
  });
});
