import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load shared
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { MoviesService } from '../shared/movies.service';
import { Image, ImageModalEvent } from 'angular-modal-gallery';

@Component({
  selector: 'app-movie-images',
  templateUrl: './movie-images.component.html',
  styleUrls: ['./movie-images.component.css']
})
export class MovieImagesComponent implements OnInit, OnDestroy {

  // Used for responsive services
  columns: number;
  _querySubscription: Subscription;

  movieBackdrops = [];
  moviePosters = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  // image gallery
  images: Image[] = [];
  openModalWindow = false;
  imagePointer = 0;

  constructor(public moviesService: MoviesService,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updateMovieImages();

    this.checkScreen();
    this.watchScreen();
  }

  // updates the images of the current movie
  updateMovieImages(): void {
    this.route.params.switchMap((params: Params) => this.moviesService
      .getMovieImages(params['id']))
      .subscribe(response => {
        this.movieBackdrops = response['backdrops'].slice(0, 12);
        this.moviePosters = response['posters'].slice(0, 12);
        this.buildImagesArray();
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  // builds an array of images for the modal gallery
  buildImagesArray() {
    for (let i = 0; i < this.movieBackdrops.length; i++) {
      const imgUrl = this.apiImgOrig + this.movieBackdrops[i]['file_path'];
      const image = new Image(imgUrl, null, null, null);
      this.images.push(image);
    }
    for (let i = 0; i < this.moviePosters.length; i++) {
      const imgUrl = this.apiImgOrig + this.moviePosters[i]['file_path'];
      const image = new Image(imgUrl, null, null, null);
      this.images.push(image);
    }
  }

  // opens the modal gallery at the clicked image
  openImageModal(index: number) {
    this.imagePointer = index;
    this.openModalWindow = true;
  }

  // closes the modal gallery
  onCloseImageModal() {
    this.openModalWindow = false;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

  /**
   * Checks the size of the screen
   */
  checkScreen(): void {
    // this.columns = 4;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 1;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 2;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 3;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 4;
      }
    });
  }

  /**
   * subscribes to the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 4;
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)')
      .subscribe((matches: boolean) => {
        this._ngZone.run(() => {
          if (matches) {
            this.columns = 1;
          }
        });
      });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
        }
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('movie-images');
  }

  resolveLoading(): void {
    this._loadingService.resolve('movie-images');
  }
}
