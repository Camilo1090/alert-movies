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
  CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule, TdMediaService,
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as seriesDetails from '../../testing/series-details.json';

import { TrendingComponent } from '../../trending/trending.component';
import { ListMoviesComponent } from '../../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from '../../people/list-people/list-people.component';
import { ListSeriesComponent } from '../list-series/list-series.component';
import { FooterComponent } from '../../footer/footer.component';
import { MovieImagesComponent } from '../../movies/movie-images/movie-images.component';
import { MovieVideosComponent } from '../../movies/movie-videos/movie-videos.component';
import { MovieCastComponent } from '../../movies/movie-cast/movie-cast.component';
import { MovieReviewsComponent } from '../../movies/movie-reviews/movie-reviews.component';
import { MovieRecommendationsComponent } from '../../movies/movie-recommendations/movie-recommendations.component';
import { SeriesDetailsComponent } from './series-details.component';
import { SeriesImagesComponent } from '../series-images/series-images.component';
import { SeriesVideosComponent } from '../series-videos/series-videos.component';
import { FormatStringPipe } from '../../shared/format-string/format-string.pipe';
import { SeriesCastComponent } from '../series-cast/series-cast.component';
import { SeriesRecommendationsComponent } from '../series-recommendations/series-recommendations.component';
import { PersonDetailsComponent } from '../../people/person-details/person-details.component';
import { PersonMoviesComponent } from '../../people/person-movies/person-movies.component';
import { PersonSeriesComponent } from '../../people/person-series/person-series.component';
import { PersonImagesComponent } from '../../people/person-images/person-images.component';
import { SearchComponent } from '../../search/search.component';
import { SearchBarComponent } from '../../search/search-bar/search-bar.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { DiscoverComponent } from '../../discover/discover.component';
import { CustomCardComponent } from '../../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../../shared/limit-text/limit-text.component';
import { API } from '../../shared/api/api';
import { SeriesService } from '../shared/series.service';


fdescribe('SeriesDetails component test', () => {
  let component: SeriesDetailsComponent;
  let fixture: ComponentFixture<SeriesDetailsComponent>;

  // Spy creation

  // Series service
  const getSeriesDetailsSpy = jasmine.createSpy('getSeriesDetails')
    .and.returnValue(Observable.of((<any>seriesDetails).series));
  const getSeriesCreditsSpy = jasmine.createSpy('getSeriesCredits')
    .and.returnValue(Observable.of(seriesDetails));

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
          provide: SeriesService, useClass: class {
            getSeriesDetails = getSeriesDetailsSpy;
            getSeriesCredits = getSeriesCreditsSpy;
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({})
          }
        },
        {
          provide: TdMediaService, useClass: class {
            query = mediaQuerySpy;
            registerQuery = mediaRegisterQuerySpy;
          }
        },
        {
          provide: Router, useClass: class {
            navigate = navigateSpy;
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDetailsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();
      expect(component.isDesktop)
        .toBe(false);
      expect(component._querySubscription)
        .toBeUndefined();

      expect(component.apiImgOrig)
        .toEqual(API.apiImg + 'original');
      expect(component.apiImgBack)
        .toEqual(API.apiImg + 'w1400_and_h450_bestv2');
      expect(component.series)
        .toEqual([]);
      expect(component.crew)
        .toEqual([]);
      expect(component.creditsObservable)
        .toBeUndefined();
      expect(component.networks)
        .toEqual([]);
      expect(component.companies)
        .toEqual([]);
      expect(component.routes)
        .toEqual((<any>seriesDetails).routes);
      expect(component.currentTab)
        .toEqual(1);
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    beforeEach(() => {
      spyOn(component, 'registerLoading').calls.reset();
      spyOn(component, 'updateSeriesDetails').calls.reset();
      spyOn(component, 'checkScreen').calls.reset();
      spyOn(component, 'watchScreen').calls.reset();
    });
    it('SHOULD call functions', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.updateSeriesDetails)
        .toHaveBeenCalledTimes(1);
      expect(component.checkScreen)
        .toHaveBeenCalledTimes(1);
      expect(component.watchScreen)
        .toHaveBeenCalledTimes(1);
    }));
  });

  describe('WHEN updateSeriesDetails function is called', () => {
    let id: number;
    beforeEach(() => {
      getSeriesDetailsSpy.calls.reset();
      getSeriesCreditsSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.series = [];
    });
    it('SHOULD call functions', () => {
      id = 10;
      component.route.params = Observable.of({ id: id });
      component.updateSeriesDetails();

      expect(component.seriesService.getSeriesDetails)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getSeriesDetails)
        .toHaveBeenCalledWith(id);
      expect(component.seriesService.getSeriesCredits)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values', () => {
      component.updateSeriesDetails();

      expect(component.series)
        .toEqual((<any>seriesDetails).series);
    });
    it('SHOULD route navigate if error', () => {
      getSeriesDetailsSpy.and.returnValue(Observable.throw({ status: 404 }));
      component.updateSeriesDetails();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/404']);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN updateSeriesCredits function is called', () => {
    let id: number;
    beforeEach(() => {
      getSeriesCreditsSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.crew = [];
    });
    it('SHOULD call functions', () => {
      id = 10;
      component.route.params = Observable.of({ id: id });
      component.updateSeriesCredits();

      expect(component.seriesService.getSeriesCredits)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getSeriesCredits)
        .toHaveBeenCalledWith(id);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values', () => {
      component.updateSeriesCredits();

      expect(component.crew)
        .toEqual((<any>seriesDetails).crew);
    });
    it('SHOULD handle error', () => {
      getSeriesCreditsSpy.and.returnValue(Observable.throw('test error'));
      component.updateSeriesCredits();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN getGenres function is called', () => {
    let genres: any[];
    it('SHOULD return genres separated by commas', () => {
      genres = [{ name: 'first' }, { name: 'second' }];

      expect(component.getGenres(genres))
        .toEqual('first, second');
    });
    it('SHOULD return empty if param is undefined', () => {
      genres = undefined;

      expect(component.getGenres(genres))
        .toEqual('');
    });
  });

  describe('WHEN convertTime function is called', () => {
    let minutes: number;
    it('SHOULD return time in h:min format', () => {
      minutes = 110;

      expect(component.convertTime(minutes))
        .toEqual('1h 50min');
    });
    it('SHOULD return empty if param is undefined', () => {
      minutes = undefined;

      expect(component.convertTime(minutes))
        .toEqual('');
    });
  });

  describe('WHEN changeTab function is called', () => {
    let tab: number;
    it('SHOULD set new value', () => {
      tab = 3;
      component.changeTab(tab);

      expect(component.currentTab)
        .toEqual(tab);
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
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-sm');
      component.checkScreen();

      expect(component.isDesktop)
        .toBe(true);
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
        .toHaveBeenCalledTimes(1);
      expect(component._ngZone.run)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === 'gt-sm') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.isDesktop)
        .toBe(true);
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
        .toHaveBeenCalledWith('series-details');
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
        .toHaveBeenCalledWith('series-details');
    });
  });
});
