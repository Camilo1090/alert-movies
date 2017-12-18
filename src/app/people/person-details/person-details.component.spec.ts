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

import * as personDetails from '../../testing/person-details.json';

import { TrendingComponent } from '../../trending/trending.component';
import { ListMoviesComponent } from '../../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from '../list-people/list-people.component';
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
import { PersonDetailsComponent } from './person-details.component';
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


fdescribe('PersonDetails component test', () => {
  let component: PersonDetailsComponent;
  let fixture: ComponentFixture<PersonDetailsComponent>;

  // Spy creation

  // service
  const getPersonDetailsSpy = jasmine.createSpy('getPersonDetails')
    .and.returnValue(Observable.of((<any>personDetails).person));
  const getPersonCreditsSpy = jasmine.createSpy('getPersonCredits')
    .and.returnValue(Observable.of(personDetails));

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
            getPersonDetails = getPersonDetailsSpy;
            getPersonCombinedCredits = getPersonCreditsSpy;
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
    fixture = TestBed.createComponent(PersonDetailsComponent);
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
      expect(component.person)
        .toEqual([]);
      expect(component.gender)
        .toBeUndefined();
      expect(component.featuredCredit)
        .toBeUndefined();
      expect(component.routes)
        .toEqual((<any>personDetails).routes);
      expect(component.currentTab)
        .toEqual(1);
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    beforeEach(() => {
      spyOn(component, 'registerLoading').calls.reset();
      spyOn(component, 'updatePersonDetails').calls.reset();
      spyOn(component, 'checkScreen').calls.reset();
      spyOn(component, 'watchScreen').calls.reset();
    });
    it('SHOULD call functions', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.updatePersonDetails)
        .toHaveBeenCalledTimes(1);
      expect(component.checkScreen)
        .toHaveBeenCalledTimes(1);
      expect(component.watchScreen)
        .toHaveBeenCalledTimes(1);
    }));
  });

  describe('WHEN updatePersonDetails function is called', () => {
    let id: number;
    beforeEach(() => {
      getPersonDetailsSpy.calls.reset();
      getPersonCreditsSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.person = [];
    });
    it('SHOULD call functions', () => {
      id = 10;
      component.route.params = Observable.of({ id: id });
      component.updatePersonDetails();

      expect(component.peopleService.getPersonDetails)
        .toHaveBeenCalledTimes(1);
      expect(component.peopleService.getPersonDetails)
        .toHaveBeenCalledWith(id);
      expect(component.peopleService.getPersonCombinedCredits)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values', () => {
      component.updatePersonDetails();

      expect(component.person)
        .toEqual((<any>personDetails).person);

      getPersonDetailsSpy.and.returnValue(Observable.of({}));
      component.updatePersonDetails();
      expect(component.gender)
        .toEqual('');

      getPersonDetailsSpy.and.returnValue(Observable.of({gender: 1}));
      component.updatePersonDetails();
      expect(component.gender)
        .toEqual('Female');

      getPersonDetailsSpy.and.returnValue(Observable.of({gender: 2}));
      component.updatePersonDetails();
      expect(component.gender)
        .toEqual('Male');
    });
    it('SHOULD route navigate if error', () => {
      getPersonDetailsSpy.and.returnValue(Observable.throw({ status: 404 }));
      component.updatePersonDetails();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/404']);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN updateFeaturedCredit function is called', () => {
    let id: number;
    beforeEach(() => {
      getPersonCreditsSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.featuredCredit = {};
    });
    it('SHOULD call functions', () => {
      id = 10;
      component.route.params = Observable.of({ id: id });
      component.updateFeaturedCredit();

      expect(component.peopleService.getPersonCombinedCredits)
        .toHaveBeenCalledTimes(1);
      expect(component.peopleService.getPersonCombinedCredits)
        .toHaveBeenCalledWith(id);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values', () => {
      component.updateFeaturedCredit();

      expect(component.featuredCredit)
        .toEqual((<any>personDetails).cast[0]);
    });
    it('SHOULD call sort', () => {
      spyOn(personDetails['cast'], 'sort').and.callFake(fn => fn({popularity: 1}, {popularity: 2}));
      component.updateFeaturedCredit();

      expect(personDetails['cast'].sort)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD handle error', () => {
      getPersonCreditsSpy.and.returnValue(Observable.throw('test error'));
      component.updateFeaturedCredit();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN getAge function is called', () => {
    let date1: Date;
    beforeEach(() => {
      date1 = new Date(Date.now());
    });
    it('SHOULD return age', () => {
      date1.setFullYear(date1.getFullYear() - 1);
      expect(component.getAge(date1.toDateString()))
        .toEqual(1);
    });
    it('SHOULD return age', () => {
      date1.setFullYear(date1.getFullYear() + 1);
      expect(component.getAge(date1.toDateString()))
        .toEqual(0);
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
        .toHaveBeenCalledWith('person-details');
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
        .toHaveBeenCalledWith('person-details');
    });
  });
});
