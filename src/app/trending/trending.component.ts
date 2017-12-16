import { Component, NgZone, OnInit } from '@angular/core';

// Load shared
import { TdLoadingService } from '@covalent/core';

// carousel config
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

// api
import { API } from '../shared/api/api';

// services
import { MoviesService } from '../movies/shared/movies.service';
import { SeriesService } from '../series/shared/series.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class TrendingComponent implements OnInit {

  movies = [];
  series = [];
  apiImg = API.apiImg + 'w1280';

  constructor(public moviesService: MoviesService,
              public seriesService: SeriesService,
              private carouselConfig: NgbCarouselConfig,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
    carouselConfig.interval = 3000;
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateMovies(1);
    this.updateSeries(1);
  }

  // updates movie results for the carousel
  updateMovies(page: number): void {
    this.moviesService.getPopularMovies(page).subscribe(response => {
      this.movies = response['results'].slice(0, 10).filter(a => a['backdrop_path']);
      this.resolveMoviesLoading();
    });
  }

  // updates tv series results for the carousel
  updateSeries(page: number): void {
    this.seriesService.getPopularSeries(page).subscribe(response => {
      this.series = response['results'].slice(0, 10).filter(a => a['backdrop_path']);
      this.resolveSeriesLoading();
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movies');
    this._loadingService.register('series');
  }

  resolveMoviesLoading(): void {
    this._loadingService.resolve('movies');
  }

  resolveSeriesLoading(): void {
    this._loadingService.resolve('series');
  }
}
