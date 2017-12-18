import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';

// services
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-movie-videos',
  templateUrl: './movie-videos.component.html',
  styleUrls: ['./movie-videos.component.css']
})
export class MovieVideosComponent implements OnInit {

  movieVideos = [];
  apiVideo = API.apiVideo;

  constructor(public moviesService: MoviesService,
              public route: ActivatedRoute,
              public sanitizer: DomSanitizer,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateMovieVideos();
  }

  // updates the available videos for a given movie
  updateMovieVideos(): void {
    this.route.params.switchMap((params: Params) => this.moviesService
      .getMovieVideos(params['id']))
      .subscribe(response => {
        this.movieVideos = response['results'].slice(0, 12);
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  // returns the sanitized external url to the movie video
  getUrl(key: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiVideo + key);
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movie-videos');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movie-videos');
  }
}
