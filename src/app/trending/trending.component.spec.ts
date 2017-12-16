import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
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
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as movies from '../testing/movies.json';
import * as series from '../testing/series.json';

import { TrendingComponent } from './trending.component';
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
import { DiscoverComponent } from '../discover/discover.component';
import { CustomCardComponent } from '../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../shared/limit-text/limit-text.component';
import { API } from '../shared/api/api';
import { MoviesService } from '../movies/shared/movies.service';
import { SeriesService } from '../series/shared/series.service';


describe('Trending component test', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;

  // Movies service
  const getPopularMoviesSpy = jasmine.createSpy('getPopularMovies')
    .and.returnValue(Observable.of(movies));
  const getPopularSeriesSpy = jasmine.createSpy('getPopularSeries')
    .and.returnValue(Observable.of(series));

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
          provide: MoviesService, useClass: class {
            getPopularMovies = getPopularMoviesSpy;
          }
        },
        {
          provide: SeriesService, useClass: class {
            getPopularSeries = getPopularSeriesSpy;
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();

      expect(component.movies)
        .toEqual([]);
      expect(component.series)
        .toEqual([]);
      expect(component.apiImg)
        .toEqual(API.apiImg + 'w1280');
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    beforeEach(fakeAsync(() => {
      spyOn<any>(component, 'registerLoading');
      spyOn<any>(component, 'updateMovies');
      spyOn<any>(component, 'updateSeries');
      component.ngOnInit();
      tick();
    }));
    it('SHOULD call updateSearchResults', () => {
      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call checkScreen', () => {
      expect(component.updateMovies)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call watchScreen', () => {
      expect(component.updateSeries)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN updateMovies function is called', () => {
    let page: number;
    beforeEach(() => {
      spyOn(component, 'resolveMoviesLoading');
      getPopularMoviesSpy.calls.reset();
      page = 1;
      component.updateMovies(page);
    });
    it('SHOULD call service', () => {
      expect(component.moviesService.getPopularMovies)
        .toHaveBeenCalledTimes(1);
      expect(component.moviesService.getPopularMovies)
        .toHaveBeenCalledWith(page);
    });
    it('SHOULD set internal values', () => {
      expect(component.movies)
        .toEqual((<any>movies).results.slice(0, 10).filter(a => a['backdrop_path']));
    });
    it('SHOULD call internal functions', () => {
      expect(component.resolveMoviesLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN updateSeries function is called', () => {
    let page: number;
    beforeEach(() => {
      spyOn(component, 'resolveSeriesLoading');
      getPopularSeriesSpy.calls.reset();
      page = 1;
      component.updateSeries(page);
    });
    it('SHOULD call service', () => {
      expect(component.seriesService.getPopularSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getPopularSeries)
        .toHaveBeenCalledWith(page);
    });
    it('SHOULD set internal values', () => {
      expect(component.series)
        .toEqual((<any>series).results.slice(0, 10).filter(a => a['backdrop_path']));
    });
    it('SHOULD call internal functions', () => {
      expect(component.resolveSeriesLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN registerLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'register');
      component.registerLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.register)
        .toHaveBeenCalledTimes(2);
      expect(component._loadingService.register)
        .toHaveBeenCalledWith('movies');
      expect(component._loadingService.register)
        .toHaveBeenCalledWith('series');
    });
  });

  describe('WHEN resolveMoviesLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'resolve');
      component.resolveMoviesLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.resolve)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.resolve)
        .toHaveBeenCalledWith('movies');
    });
  });

  describe('WHEN resolveSeriesLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'resolve');
      component.resolveSeriesLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.resolve)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.resolve)
        .toHaveBeenCalledWith('series');
    });
  });
});
