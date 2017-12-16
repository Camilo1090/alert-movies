import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

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
import { FormatStringPipe } from '../format-string/format-string.pipe';
import { SeriesCastComponent } from '../../series/series-cast/series-cast.component';
import { SeriesRecommendationsComponent } from '../../series/series-recommendations/series-recommendations.component';
import { PersonDetailsComponent } from '../../people/person-details/person-details.component';
import { PersonMoviesComponent } from '../../people/person-movies/person-movies.component';
import { PersonSeriesComponent } from '../../people/person-series/person-series.component';
import { PersonImagesComponent } from '../../people/person-images/person-images.component';
import { SearchComponent } from '../../search/search.component';
import { SearchBarComponent } from '../../search/search-bar/search-bar.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { DiscoverComponent } from '../../discover/discover.component';
import { CustomCardComponent } from './custom-card.component';
import { LimitTextComponent } from '../limit-text/limit-text.component';
import { API } from '../api/api';


describe('CustomCard component test', () => {
  let component: CustomCardComponent;
  let fixture: ComponentFixture<CustomCardComponent>;

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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();

      expect(component.apiImg)
        .toEqual(API.apiImg + 'w500');
      expect(component.apiImgOrig)
        .toEqual(API.apiImg + 'original');
      expect(component._media)
        .toBeUndefined();
      expect(component._img)
        .toBeUndefined();
      expect(component._title)
        .toBeUndefined();
      expect(component._rating)
        .toBeUndefined();
      expect(component._subText)
        .toBeUndefined();
    });
  });

  describe('WHEN media getter is called', () => {
    let value: any;
    beforeEach(() => {
      value = component.media;
    });
    it('SHOULD return its value', () => {
      expect(value)
        .toEqual(component._media);
    });
  });

  describe('WHEN media setter is called', () => {
    let value: any;
    beforeEach(() => {
      value = 'test';
      component.media = value;
    });
    it('SHOULD set its value', () => {
      expect(component._media)
        .toEqual(value);
    });
  });

  describe('WHEN img getter is called', () => {
    let value: any;
    beforeEach(() => {
      value = component.img;
    });
    it('SHOULD return its value', () => {
      expect(value)
        .toEqual(component._img);
    });
  });

  describe('WHEN img setter is called', () => {
    let value: any;
    beforeEach(() => {
      value = 'test';
      component.img = value;
    });
    it('SHOULD set its value', () => {
      expect(component._img)
        .toEqual(value);
    });
  });

  describe('WHEN title getter is called', () => {
    let value: any;
    beforeEach(() => {
      value = component.title;
    });
    it('SHOULD return its value', () => {
      expect(value)
        .toEqual(component._title);
    });
  });

  describe('WHEN title setter is called', () => {
    let value: any;
    beforeEach(() => {
      value = 'test';
      component.title = value;
    });
    it('SHOULD set its value', () => {
      expect(component._title)
        .toEqual(value);
    });
  });

  describe('WHEN rating getter is called', () => {
    let value: any;
    beforeEach(() => {
      value = component.rating;
    });
    it('SHOULD return its value', () => {
      expect(value)
        .toEqual(component._rating);
    });
  });

  describe('WHEN img setter is called', () => {
    let value: any;
    beforeEach(() => {
      value = 1;
      component.rating = value;
    });
    it('SHOULD set its value', () => {
      expect(component._rating)
        .toEqual(value);
    });
  });

  describe('WHEN subText getter is called', () => {
    let value: any;
    beforeEach(() => {
      value = component.subText;
    });
    it('SHOULD return its value', () => {
      expect(value)
        .toEqual(component._subText);
    });
  });

  describe('WHEN subText setter is called', () => {
    let value: any;
    beforeEach(() => {
      value = 'test';
      component.subText = value;
    });
    it('SHOULD set its value', () => {
      expect(component._subText)
        .toEqual(value);
    });
  });
});
