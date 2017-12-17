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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as movies from '../testing/movies.json';
import * as series from '../testing/series.json';
import * as people from '../testing/people.json';

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
import { SearchComponent } from './search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { DiscoverComponent } from '../discover/discover.component';
import { CustomCardComponent } from '../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../shared/limit-text/limit-text.component';
import { SearchService } from './shared/search.service';
import { API } from '../shared/api/api';


describe('Search component test', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  // Spy creation

  // Search
  const searchMoviesSpy = jasmine.createSpy('searchMovies')
    .and.returnValue(Observable.of(movies));
  const searchSeriesSpy = jasmine.createSpy('searchSeries')
    .and.returnValue(Observable.of(series));
  const searchPeopleSpy = jasmine.createSpy('searchPeople')
    .and.returnValue(Observable.of(people));

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
          provide: SearchService, useClass: class {
            searchMovies = searchMoviesSpy;
            searchSeries = searchSeriesSpy;
            searchPeople = searchPeopleSpy;
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ media: 'person', query: 'efren', page: 2 })
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
    fixture = TestBed.createComponent(SearchComponent);
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
      expect(component.columnsPeople)
        .toBeUndefined();
      expect(component._querySubscription)
        .toBeUndefined();
      expect(component.ready)
        .toBe(false);

      expect(component.media)
        .toEqual('movie');
      expect(component.query)
        .toEqual('');

      expect(component.firstLast)
        .toBe(true);
      expect(component.totalPages)
        .toBeUndefined();
      expect(component.totalResults)
        .toBeUndefined();
      expect(component.totalMovies)
        .toEqual(0);
      expect(component.totalSeries)
        .toEqual(0);
      expect(component.totalPeople)
        .toEqual(0);
      expect(component.currentPage)
        .toEqual(1);

      expect(component.results)
        .toEqual([]);
      expect(component.apiImg)
        .toEqual(API.apiImg + 'w500');
      expect(component.apiImgOrig)
        .toEqual(API.apiImg + 'original');
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    beforeEach(fakeAsync(() => {
      spyOn<any>(component, 'updateSearchResults');
      spyOn<any>(component, 'checkScreen');
      spyOn<any>(component, 'watchScreen');
      component.ngOnInit();
      tick();
    }));
    it('SHOULD read param values', () => {
      expect(component.media)
        .toEqual('person');
      expect(component.query)
        .toEqual('efren');
      expect(component.currentPage)
        .toEqual(2);
    });
    it('SHOULD call updateSearchResults', () => {
      expect(component.updateSearchResults)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call checkScreen', () => {
      expect(component.checkScreen)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call watchScreen', () => {
      expect(component.watchScreen)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN updateSearchResults function is called', () => {
    beforeEach(() => {
      searchMoviesSpy.calls.reset();
      searchSeriesSpy.calls.reset();
      searchPeopleSpy.calls.reset();
      component.currentPage = 1;
    });
    it('SHOULD call services when there is a query', () => {
      component.query = 'term';
      component.updateSearchResults();

      expect(component.searchService.searchMovies)
        .toHaveBeenCalledTimes(1);
      expect(component.searchService.searchMovies)
        .toHaveBeenCalledWith(component.query, component.currentPage);

      expect(component.searchService.searchSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.searchService.searchSeries)
        .toHaveBeenCalledWith(component.query, component.currentPage);

      expect(component.searchService.searchPeople)
        .toHaveBeenCalledTimes(1);
      expect(component.searchService.searchPeople)
        .toHaveBeenCalledWith(component.query, component.currentPage);
    });
    it('SHOULD set corresponding values when media is movie', () => {
      component.media = 'movie';
      component.query = 'term';
      component.updateSearchResults();

      expect(component.results)
        .toEqual((<any>movies).results);
      expect(component.totalMovies)
        .toEqual((<any>movies).total_results);
      expect(component.totalResults)
        .toEqual((<any>movies).total_results);
      expect(component.totalPages)
        .toEqual((<any>movies).total_pages);
      expect(component.totalSeries)
        .toEqual((<any>series).total_results);
      expect(component.totalPeople)
        .toEqual((<any>people).total_results);
      expect(component.ready)
        .toBe(true);
    });
    it('SHOULD set corresponding values when media is series', () => {
      component.media = 'series';
      component.query = 'term';
      component.updateSearchResults();

      expect(component.results)
        .toEqual((<any>series).results);
      expect(component.totalSeries)
        .toEqual((<any>series).total_results);
      expect(component.totalResults)
        .toEqual((<any>series).total_results);
      expect(component.totalPages)
        .toEqual((<any>series).total_pages);
      expect(component.totalMovies)
        .toEqual((<any>movies).total_results);
      expect(component.totalPeople)
        .toEqual((<any>people).total_results);
      expect(component.ready)
        .toBe(true);
    });
    it('SHOULD set corresponding values when media is person', () => {
      component.media = 'person';
      component.query = 'term';
      component.updateSearchResults();

      expect(component.results)
        .toEqual((<any>people).results);
      expect(component.totalPeople)
        .toEqual((<any>people).total_results);
      expect(component.totalResults)
        .toEqual((<any>people).total_results);
      expect(component.totalPages)
        .toEqual((<any>people).total_pages);
      expect(component.totalMovies)
        .toEqual((<any>movies).total_results);
      expect(component.totalSeries)
        .toEqual((<any>series).total_results);
      expect(component.ready)
        .toBe(true);
    });
    it('SHOULD not call any services when there is no query', () => {
      component.query = '';
      component.updateSearchResults();

      expect(component.searchService.searchMovies)
        .toHaveBeenCalledTimes(0);
      expect(component.searchService.searchSeries)
        .toHaveBeenCalledTimes(0);
      expect(component.searchService.searchPeople)
        .toHaveBeenCalledTimes(0);
    });
    it('SHOULD set corresponding values when there is no query', () => {
      component.query = '';
      component.updateSearchResults();

      expect(component.results)
        .toEqual([]);
      expect(component.ready)
        .toBe(true);
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
      component.changePage(event);

      expect(component.currentPage)
        .toEqual(event.page);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/search', component.media, {'query': component.query, 'page': event.page}]);
    });
  });

  describe('WHEN onMoviesClick function is called', () => {
    beforeEach(() => {
      navigateSpy.calls.reset();
      component.query = 'term';
    });
    it('SHOULD navigate to page 1 if there is a paging bar', () => {
      component.media = 'movie';
      component.pagingBar = new TdPagingBarComponent(new Dir());
      spyOn<any>(component.pagingBar, 'navigateToPage');
      component.onMoviesClick();

      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledWith(1);
    });
    it('SHOULD navigate to movies if not already on movies', () => {
      component.media = 'series';
      component.onMoviesClick();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/search', 'movie', {'query': component.query, 'page': 1}]);
    });
    it('SHOULD not navigate to movies if already on movies', () => {
      component.media = 'movie';
      component.onMoviesClick();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
  });

  describe('WHEN onSeriesClick function is called', () => {
    beforeEach(() => {
      navigateSpy.calls.reset();
      component.query = 'term';
    });
    it('SHOULD navigate to page 1 if there is a paging bar', () => {
      component.media = 'movie';
      component.pagingBar = new TdPagingBarComponent(new Dir());
      spyOn<any>(component.pagingBar, 'navigateToPage');
      component.onSeriesClick();

      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledWith(1);
    });
    it('SHOULD navigate to series if not already on series', () => {
      component.media = 'movie';
      component.onSeriesClick();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/search', 'series', {'query': component.query, 'page': 1}]);
    });
    it('SHOULD not navigate to series if already on series', () => {
      component.media = 'series';
      component.onSeriesClick();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
  });

  describe('WHEN onPeopleClick function is called', () => {
    beforeEach(() => {
      navigateSpy.calls.reset();
      component.query = 'term';
    });
    it('SHOULD navigate to page 1 if there is a paging bar', () => {
      component.media = 'movie';
      component.pagingBar = new TdPagingBarComponent(new Dir());
      spyOn<any>(component.pagingBar, 'navigateToPage');
      component.onPeopleClick();

      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledWith(1);
    });
    it('SHOULD navigate to people if not already on people', () => {
      component.media = 'movie';
      component.onPeopleClick();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/search', 'person', {'query': component.query, 'page': 1}]);
    });
    it('SHOULD not navigate to people if already on people', () => {
      component.media = 'person';
      component.onPeopleClick();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
  });

  describe('WHEN getKnownFor function is called', () => {
    let person;
    beforeEach(() => {
      person = {
        known_for: [
          {
            media_type: 'movie',
            title: 'myMovie'
          }
        ]
      };
    });
    it('SHOULD return the title of the movie when media is movie', () => {
      expect(component.getKnownFor(person))
        .toEqual(person.known_for[0].title);
    });
    it('SHOULD return the name of the series when media is series', () => {
      person.known_for[0].media_type = 'series';
      person.known_for[0].name = 'mySeries';
      expect(component.getKnownFor(person))
        .toEqual(person.known_for[0].name);
    });
    it('SHOULD return empty if no credit is available', () => {
      person.known_for = undefined;
      expect(component.getKnownFor(person))
        .toEqual('');
    });
  });

  describe('WHEN checkScreen function is called', () => {
    beforeEach(() => {
      spyOn<any>(component._ngZone, 'run').and.callFake(fn => fn());
      mediaQuerySpy.calls.reset();
    });
    it('SHOULD call internal functions', () => {
      component.checkScreen();

      expect(component._ngZone.run)
        .toHaveBeenCalledTimes(1);
      expect(component._mediaService.query)
        .toHaveBeenCalledTimes(5);
    });
    it('SHOULD set internal values when query is (max-width: 600px)', () => {
      mediaQuerySpy.and.callFake((query: string) => query === '(max-width: 600px)');
      component.checkScreen();

      expect(component.columns)
        .toEqual(1);
      expect(component.columnsPeople)
        .toEqual(2);
    });
    it('SHOULD set internal values when query is (max-width: 375px)', () => {
      mediaQuerySpy.and.callFake((query: string) => query === '(max-width: 375px)');
      component.checkScreen();

      expect(component.columns)
        .toEqual(1);
      expect(component.columnsPeople)
        .toEqual(1);
    });
    it('SHOULD set internal values when query is gt-xs', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-xs');
      component.checkScreen();

      expect(component.columns)
        .toEqual(2);
      expect(component.columnsPeople)
        .toEqual(3);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-sm');
      component.checkScreen();

      expect(component.columns)
        .toEqual(3);
      expect(component.columnsPeople)
        .toEqual(4);
    });
    it('SHOULD set internal values when query is gt-md', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-md');
      component.checkScreen();

      expect(component.columns)
        .toEqual(4);
      expect(component.columnsPeople)
        .toEqual(5);
    });
  });

  describe('WHEN watchScreen function is called', () => {
    beforeEach(() => {
      spyOn<any>(component._ngZone, 'run').and.callFake(fn => fn());
      mediaRegisterQuerySpy.calls.reset();
    });
    it('SHOULD call internal functions', () => {
      component.watchScreen();

      expect(component._mediaService.registerQuery)
        .toHaveBeenCalledTimes(5);
      expect(component._ngZone.run)
        .toHaveBeenCalledTimes(5);
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
      expect(component.columnsPeople)
        .toEqual(2);
    });
    it('SHOULD set internal values when query is (max-width: 375px)', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === '(max-width: 375px)') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(1);
      expect(component.columnsPeople)
        .toEqual(1);
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
      expect(component.columnsPeople)
        .toEqual(3);
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
      expect(component.columnsPeople)
        .toEqual(4);
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
      expect(component.columnsPeople)
        .toEqual(5);
    });
  });
});
