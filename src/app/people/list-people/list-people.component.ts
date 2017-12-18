import { Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// pagination
import { IPageChangeEvent, TdPagingBarComponent } from '@covalent/core';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { PeopleService } from '../shared/people.service';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListPeopleComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  // Used for responsive services
  columns: number;
  _querySubscription: Subscription;

  // Used for the pagination
  currentPage = 1;
  firstLast = true;
  totalResults: number;
  totalPages: number;

  people = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(public peopleService: PeopleService,
              public route: ActivatedRoute,
              public router: Router,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.registerLoading();
      if (params['page']) {
        this.currentPage = params['page'];
      } else {
        this.currentPage = 1;
      }
      this.updatePeople();
    });

    this.checkScreen();
    this.watchScreen();
  }

  // updates the list of people
  updatePeople(): void {
    this.peopleService.getPopularPeople(this.currentPage).subscribe(response => {
      if (response['results']) {
        this.people = response['results'];
      }
      this.totalResults = response['total_results'] <= 20000 ? response['total_results'] : 20000;
      this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
      this.resolveLoading();
    }, err => {
      console.log(err);
      this.people = [];
      this.resolveLoading();
    });
  }

  /**
   * manages the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.router.navigate(['/list-people', {'page': this.currentPage}]);
  }

  // gets the title of the first movie or tv series of a given person
  getKnownFor(person: any): string {
    let result = '';
    if (person['known_for'] && person['known_for'].length > 0) {
      if (person['known_for'][0]['media_type'] === 'movie') {
        result = person['known_for'][0]['title'];
      } else {
        result = person['known_for'][0]['name'];
      }
    }
    return result;
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
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 2;
      }
      if (this._mediaService.query('(max-width: 375px)')) {
        this.columns = 1;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 3;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 4;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 5;
      }
    });
  }

  /**
   * subscribes to the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('(max-width: 375px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 5;
        }
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('people');
  }

  resolveLoading(): void {
    this._loadingService.resolve('people');
  }
}
