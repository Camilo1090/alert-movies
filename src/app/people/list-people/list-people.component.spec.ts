import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  CovalentChipsModule, CovalentLayoutModule, CovalentLoadingModule, CovalentMediaModule, CovalentMenuModule,
  CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule, IPageChangeEvent, TdMediaService
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as people from '../../testing/people.json';

import { TrendingComponent } from '../../trending/trending.component';
import { ListMoviesComponent } from '../../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from './list-people.component';
import { ListSeriesComponent } from '../../series/list-series/list-series.component';
import { FooterComponent } from '../../footer/footer.component';
import { MovieImagesComponent } from '../../movies/movie-images/movie-images.component';
import { MovieVideosComponent } from '../../movies/movie-videos/movie-videos.component';
import { MovieCastComponent } from '../../movies/movie-cast/movie-cast.component';
import { MovieReviewsComponent } from '../../movies/movie-reviews/movie-reviews.component';
import { MovieRecommendationsComponent } from '../../movies/movie-recommendations/movie-recommendations.component';
import { SeriesDetailsComponent } from '../../series/series-details/series-details.component';
import { SeriesImagesComponent } from '../../series/series-images/series-images.component';
import { SeriesVideosComponent } from '../../series/series-videos/series-videos.component';
import { FormatStringPipe } from '../../shared/format-string/format-string.pipe';
import { SeriesCastComponent } from '../../series/series-cast/series-cast.component';
import { SeriesRecommendationsComponent } from '../../series/series-recommendations/series-recommendations.component';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { PersonMoviesComponent } from '../person-movies/person-movies.component';
import { PersonSeriesComponent } from '../person-series/person-series.component';
import { PersonImagesComponent } from '../person-images/person-images.component';
import { SearchComponent } from '../../search/search.component';
import { SearchBarComponent } from '../../search/search-bar/search-bar.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { DiscoverComponent } from '../../discover/discover.component';
import { CustomCardComponent } from '../../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../../shared/limit-text/limit-text.component';
import { API } from '../../shared/api/api';
import { PeopleService } from '../shared/people.service';


describe('ListPeople component test', () => {
  let component: ListPeopleComponent;
  let fixture: ComponentFixture<ListPeopleComponent>;

  // Spy creation

  // Service
  const getPopularPeopleSpy = jasmine.createSpy('getPopularPeople')
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
          provide: PeopleService, useClass: class {
            getPopularPeople = getPopularPeopleSpy;
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
    fixture = TestBed.createComponent(ListPeopleComponent);
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
      expect(component._querySubscription)
        .toBeUndefined();

      expect(component.currentPage)
        .toEqual(1);
      expect(component.firstLast)
        .toBe(true);
      expect(component.totalResults)
        .toBeUndefined();
      expect(component.totalPages)
        .toBeUndefined();

      expect(component.people)
        .toEqual([]);
      expect(component.apiImg)
        .toEqual(API.apiImg + 'w500');
      expect(component.apiImgOrig)
        .toEqual(API.apiImg + 'original');
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    let page: number;
    beforeEach(() => {
      spyOn(component, 'registerLoading').calls.reset();
      spyOn(component, 'updatePeople').calls.reset();
      spyOn(component, 'checkScreen').calls.reset();
      spyOn(component, 'watchScreen').calls.reset();
    });
    it('SHOULD set default values if no params are provided', fakeAsync(() => {
      component.route.params = Observable.of({});
      component.ngOnInit();
      tick();

      expect(component.currentPage)
        .toEqual(1);
    }));
    it('SHOULD call functions', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.updatePeople)
        .toHaveBeenCalledTimes(1);
      expect(component.checkScreen)
        .toHaveBeenCalledTimes(1);
      expect(component.watchScreen)
        .toHaveBeenCalledTimes(1);
    }));
    it('SHOULD read param values', fakeAsync(() => {
      page = 2;
      component.route.params = Observable.of({ page: page });
      component.ngOnInit();
      tick();

      expect(component.currentPage)
        .toEqual(page);
    }));
  });

  describe('WHEN updatePeople function is called', () => {
    let page: number;
    beforeEach(() => {
      getPopularPeopleSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.people = [];
    });
    it('SHOULD call service', () => {
      page = 2;
      component.currentPage = page;
      component.updatePeople();

      expect(component.peopleService.getPopularPeople)
        .toHaveBeenCalledTimes(1);
      expect(component.peopleService.getPopularPeople)
        .toHaveBeenCalledWith(page);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values', () => {
      component.updatePeople();

      expect(component.people)
        .toEqual((<any>people).results);
      expect(component.totalResults)
        .toEqual((<any>people).total_results);
      expect(component.totalPages)
        .toEqual((<any>people).total_pages);
    });
    it('SHOULD handle error', () => {
      getPopularPeopleSpy.and.returnValue(Observable.throw('test error'));
      component.updatePeople();

      expect(component.people)
        .toEqual([]);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
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
        .toHaveBeenCalledWith(['/list-people', { 'page': event.page }]);
    });
  });

  describe('WHEN getKnownFor function is called', () => {
    let person: Object;
    it('SHOULD return title of the movie if movie', () => {
      person = {
        known_for: [{media_type: 'movie', title: 'myMovie'}],
      };

      expect(component.getKnownFor(person))
        .toEqual('myMovie');
    });
    it('SHOULD return name of the series if series', () => {
      person = {
        known_for: [{media_type: 'series', name: 'mySeries'}],
      };

      expect(component.getKnownFor(person))
        .toEqual('mySeries');
    });
    it('SHOULD return empty if there are no movies nor series', () => {
      person = {};

      expect(component.getKnownFor(person))
        .toEqual('');
    });
  });

  describe('WHEN checkScreen function is called', () => {
    beforeEach(() => {
      spyOn(component._ngZone, 'run').and.callFake(fn => fn());
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
        .toEqual(2);
    });
    it('SHOULD set internal values when query is (max-width: 375px)', () => {
      mediaQuerySpy.and.callFake((query: string) => query === '(max-width: 375px)');
      component.checkScreen();

      expect(component.columns)
        .toEqual(1);
    });
    it('SHOULD set internal values when query is gt-xs', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-xs');
      component.checkScreen();

      expect(component.columns)
        .toEqual(3);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-sm');
      component.checkScreen();

      expect(component.columns)
        .toEqual(4);
    });
    it('SHOULD set internal values when query is gt-md', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-md');
      component.checkScreen();

      expect(component.columns)
        .toEqual(5);
    });
  });

  describe('WHEN watchScreen function is called', () => {
    beforeEach(() => {
      spyOn(component._ngZone, 'run').and.callFake(fn => fn());
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
        .toEqual(5);
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
        .toHaveBeenCalledWith('people');
    });
  });

  describe('WHEN resolveLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'resolve');
      component.resolveLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.resolve)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.resolve)
        .toHaveBeenCalledWith('people');
    });
  });
});
