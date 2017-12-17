import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import { TrendingComponent } from '../trending/trending.component';
import { ListMoviesComponent } from '../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from '../people/list-people/list-people.component';
import { ListSeriesComponent } from '../series/list-series/list-series.component';
import { FooterComponent } from './footer.component';
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


describe('Footer component test', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

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
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  it('SHOULD create the component', () => {
    expect(component)
      .toBeTruthy();
  });
});
