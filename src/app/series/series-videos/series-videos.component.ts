import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { SeriesService } from '../shared/series.service';

@Component({
  selector: 'app-series-videos',
  templateUrl: './series-videos.component.html',
  styleUrls: ['./series-videos.component.css']
})
export class SeriesVideosComponent implements OnInit {

  seriesVideos = [];
  apiVideo = API.apiVideo;

  constructor(public seriesService: SeriesService,
              public route: ActivatedRoute,
              public sanitizer: DomSanitizer,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateSeriesVideos();
  }

  updateSeriesVideos(): void {
    this.route.params.switchMap((params: Params) => this.seriesService
      .getSeriesVideos(params['id']))
      .subscribe(response => {
        this.seriesVideos = response['results'].slice(0, 12);
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  getUrl(key: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiVideo + key);
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('series-videos');
  }

  resolveLoading(): void {
    this._loadingService.resolve('series-videos');
  }
}
