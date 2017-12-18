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
  CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as movieDetails from '../../testing/movie-details.json';

import { TrendingComponent } from '../../trending/trending.component';
import { ListMoviesComponent } from '../list-movies/list-movies.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { ListPeopleComponent } from '../../people/list-people/list-people.component';
import { ListSeriesComponent } from '../../series/list-series/list-series.component';
import { FooterComponent } from '../../footer/footer.component';
import { MovieImagesComponent } from '../movie-images/movie-images.component';
import { MovieVideosComponent } from './movie-videos.component';
import { MovieCastComponent } from '../movie-cast/movie-cast.component';
import { MovieReviewsComponent } from '../movie-reviews/movie-reviews.component';
import { MovieRecommendationsComponent } from '../movie-recommendations/movie-recommendations.component';
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
import { SearchComponent } from '../../search/search.component';
import { SearchBarComponent } from '../../search/search-bar/search-bar.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { DiscoverComponent } from '../../discover/discover.component';
import { CustomCardComponent } from '../../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../../shared/limit-text/limit-text.component';
import { MoviesService } from '../shared/movies.service';
import { API } from '../../shared/api/api';


describe('MovieVideos component test', () => {
  let component: MovieVideosComponent;
  let fixture: ComponentFixture<MovieVideosComponent>;

  // Spy creation

  // Movie service
  const getMovieVideosSpy = jasmine.createSpy('getMovieVideos')
    .and.returnValue(Observable.of(movieDetails['videos']));

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
            getMovieVideos = getMovieVideosSpy;
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({})
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieVideosComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();

      expect(component.movieVideos)
        .toEqual([]);
      expect(component.apiVideo)
        .toEqual(API.apiVideo);
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    beforeEach(() => {
      spyOn(component, 'registerLoading').calls.reset();
      spyOn(component, 'updateMovieVideos').calls.reset();
    });
    it('SHOULD call functions', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.updateMovieVideos)
        .toHaveBeenCalledTimes(1);
    }));
  });

  describe('WHEN updateMovieVideos function is called', () => {
    let id: number;
    beforeEach(() => {
      getMovieVideosSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.movieVideos = [];
    });
    it('SHOULD call service', () => {
      id = 10;
      component.route.params = Observable.of({ id: id });
      component.updateMovieVideos();

      expect(component.moviesService.getMovieVideos)
        .toHaveBeenCalledTimes(1);
      expect(component.moviesService.getMovieVideos)
        .toHaveBeenCalledWith(id);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values', () => {
      component.updateMovieVideos();

      expect(component.movieVideos)
        .toEqual((<any>movieDetails).videos.results.slice(0, 12));
    });
    it('SHOULD handle error', () => {
      getMovieVideosSpy.and.returnValue(Observable.throw('test error'));
      component.updateMovieVideos();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN getUrl function is called', () => {
    let key: string;
    beforeEach(() => {
      key = 'some-url';
      spyOn(component.sanitizer, 'bypassSecurityTrustResourceUrl');
    });
    it('SHOULD call the sanitizer', () => {
      component.getUrl(key);
      expect(component.sanitizer.bypassSecurityTrustResourceUrl)
        .toHaveBeenCalledTimes(1);
      expect(component.sanitizer.bypassSecurityTrustResourceUrl)
        .toHaveBeenCalledWith(API.apiVideo + key);
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
        .toHaveBeenCalledWith('movie-videos');
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
        .toHaveBeenCalledWith('movie-videos');
    });
  });
});
