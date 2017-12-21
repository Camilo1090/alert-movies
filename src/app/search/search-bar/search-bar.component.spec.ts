import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  CovalentChipsModule, CovalentLayoutModule, CovalentLoadingModule, CovalentMediaModule, CovalentMenuModule,
  CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as movies from '../../testing/movies.json';

import { TrendingComponent } from '../../trending/trending.component';
import { ListMoviesComponent } from '../../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from '../../people/list-people/list-people.component';
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
import { PersonDetailsComponent } from '../../people/person-details/person-details.component';
import { PersonMoviesComponent } from '../../people/person-movies/person-movies.component';
import { PersonSeriesComponent } from '../../people/person-series/person-series.component';
import { PersonImagesComponent } from '../../people/person-images/person-images.component';
import { SearchComponent } from '../search.component';
import { SearchBarComponent } from './search-bar.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { DiscoverComponent } from '../../discover/discover.component';
import { CustomCardComponent } from '../../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../../shared/limit-text/limit-text.component';
import { SearchService } from '../shared/search.service';


describe('SearchBar component test', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  // Spy creation

  // Search
  const searchMultiSpy = jasmine.createSpy('searchMulti')
    .and.returnValue(Observable.of(movies));

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
            searchMulti = searchMultiSpy;
          }
        },
        {
          provide: Router, useClass: class {
            navigate = navigateSpy;
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();

      // expect(component.searchBar)
      //   .toBeDefined();
      expect(component.searchInputTerm)
        .toBeDefined();
      expect(component.complete)
        .toBeUndefined();
      expect(component.results)
        .toEqual([]);
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    beforeEach(fakeAsync(() => {
      spyOn(component, 'updateSearch');
      component.ngOnInit();
      tick();
    }));
    it('SHOULD call updateSearch', () => {
      expect(component.updateSearch)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN updateSearch function is called', () => {
    let query: string;
    let obs: Observable<any>;
    beforeEach(() => {
      searchMultiSpy.calls.reset();
    });
    it('SHOULD call functions when there is a query', () => {
      query = 'term';
      obs = Observable.of({});
      spyOn(component.searchInputTerm, 'debounceTime').and.returnValue(obs);
      spyOn(obs, 'distinctUntilChanged').and.returnValue(obs);
      spyOn(obs, 'switchMap').and.callFake(fn => fn(query));
      searchMultiSpy.and.returnValue(obs);
      spyOn(obs, 'map').and.callFake(fn => { fn(movies); return obs; });
      spyOn(movies['results'], 'sort').and.callFake(fn => fn({popularity: 1}, {popularity: 2}));
      spyOn(obs, 'do').and.callFake(fn => fn(movies['results']));
      component.updateSearch();

      expect(component.searchInputTerm.debounceTime)
        .toHaveBeenCalledTimes(1);
      expect(obs.distinctUntilChanged)
        .toHaveBeenCalledTimes(1);
      expect(obs.switchMap)
        .toHaveBeenCalledTimes(1);
      expect(component.searchService.searchMulti)
        .toHaveBeenCalledTimes(1);
      expect(component.searchService.searchMulti)
        .toHaveBeenCalledWith(query, 1);
      expect(movies['results'].sort)
        .toHaveBeenCalledTimes(1);
      expect(obs.do)
        .toHaveBeenCalledTimes(1);
      expect(component.results)
        .toEqual(movies['results']);
    });
    it('SHOULD not call service nor sort if no query', () => {
      query = undefined;
      component.searchInputTerm.next(query);
      spyOn(movies['results'], 'sort').and.callFake(fn => fn({popularity: 1}, {popularity: 2}));
      component.updateSearch();

      expect(component.searchService.searchMulti)
        .toHaveBeenCalledTimes(0);
      expect(movies['results'].sort)
        .toHaveBeenCalledTimes(0);
    });
  });

  describe('WHEN search function is called', () => {
    let input: string;
    it('SHOULD call function', () => {
      spyOn(component.searchInputTerm, 'next');
      input = 'term';
      component.search(input);

      expect(component.searchInputTerm.next)
        .toHaveBeenCalledTimes(1);
      expect(component.searchInputTerm.next)
        .toHaveBeenCalledWith(input);
    });
  });

  describe('WHEN clear function is called', () => {
    it('SHOULD set values', () => {
      component.searchBar.toggleVisibility();
      spyOn(component.searchBar, 'toggleVisibility');
      spyOn(component.searchInputTerm, 'next');
      component.clear();

      expect(component.searchBar.value)
        .toEqual('');
      expect(component.searchInputTerm.next)
        .toHaveBeenCalledTimes(1);
      expect(component.searchInputTerm.next)
        .toHaveBeenCalledWith('');
      expect(component.searchBar.toggleVisibility)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN onEnter function is called', () => {
    it('SHOULD call functions if query', () => {
      navigateSpy.calls.reset();
      spyOn(component, 'clear').calls.reset();
      component.searchBar.value = 'term';
      component.onEnter();

      expect(component.clear)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/search', 'movie', {'query': component.searchBar.value, 'page': 1}]);
    });
    it('SHOULD not call functions if undefined query', () => {
      navigateSpy.calls.reset();
      spyOn(component, 'clear').calls.reset();
      component.searchBar.value = undefined;
      component.onEnter();

      expect(component.clear)
        .toHaveBeenCalledTimes(0);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
    it('SHOULD not call functions if empty query', () => {
      navigateSpy.calls.reset();
      spyOn(component, 'clear').calls.reset();
      component.searchBar.value = '';
      component.onEnter();

      expect(component.clear)
        .toHaveBeenCalledTimes(0);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
  });

  describe('WHEN onFocusOut function is called', () => {
    it('SHOULD call function', () => {
      spyOn(component.searchInputTerm, 'next');
      component.onFocusOut();

      expect(component.searchInputTerm.next)
        .toHaveBeenCalledTimes(1);
      expect(component.searchInputTerm.next)
        .toHaveBeenCalledWith('');
    });
  });
});
