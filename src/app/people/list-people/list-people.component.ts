import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load shared
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../../shared/api/api';
import { GENRES } from '../../shared/api/genres';

// services
import { PeopleService } from '../shared/people.service';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css'],
  providers: [ PeopleService, TdMediaService ],
  encapsulation: ViewEncapsulation.None
})
export class ListPeopleComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  columns: number;
  private _querySubscription: Subscription;

  // Used for the pagination
  event: IPageChangeEvent;
  firstLast = true;
  pageSizeAll = false;
  pageLinkCount = 5;
  totalPages: number;

  response = [];
  people = [];
  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(private peopleService: PeopleService,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
  }

  ngOnInit(): void {
    this.registerLoading();

    this.updatePeople(1);

    this.checkScreen();
    this.watchScreen();
  }

  updatePeople(page: number): void {
    this.peopleService.getPopularPeople(page).subscribe(response => {
      this.response = response;
      this.people = response['results'];
      this.totalPages = response['total_pages'];
      this.resolveLoading();
    });
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  /**
   * Check the size of the screen
   */
  checkScreen(): void {
    // this.columns = 5;
    this._ngZone.run(() => {
      if (this._mediaService.query('(max-width: 600px)')) {
        this.columns = 2;
        this.isDesktop = false;
        this.pageLinkCount = 1;
      }
      if (this._mediaService.query('(max-width: 375px)')) {
        this.columns = 1;
        this.isDesktop = false;
        this.pageLinkCount = 1;
      }
      if (this._mediaService.query('gt-xs')) {
        this.columns = 3;
        this.isDesktop = false;
        this.pageLinkCount = 1;
      }
      if (this._mediaService.query('gt-sm')) {
        this.columns = 4;
        this.isDesktop = true;
        this.pageLinkCount = 5;
      }
      if (this._mediaService.query('gt-md')) {
        this.columns = 5;
        this.isDesktop = true;
        this.pageLinkCount = 5;
      }
    });
  }

  /**
   * This method subscribes with the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    // this.columns = 5;
    this._querySubscription = this._mediaService.registerQuery('(max-width: 600px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 2;
          this.isDesktop = false;
          this.pageLinkCount = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('(max-width: 375px)').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 1;
          this.isDesktop = false;
          this.pageLinkCount = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 3;
          this.isDesktop = false;
          this.pageLinkCount = 1;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 4;
          this.isDesktop = true;
          this.pageLinkCount = 5;
        }
      });
    });
    this._querySubscription = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        if (matches) {
          this.columns = 5;
          this.isDesktop = true;
          this.pageLinkCount = 5;
        }
      });
    });
  }

  /**
   * Get an array of genres by id and return the name of these separated by comma
   * @param genresId: Array of genres by id
   * @returns {string}: List of genres separated by comma
   */
  getGenre(genresId: Array<number>): any {
    let genres = '';
    if (genresId) {
      for (const id of genresId) {
        if (id === genresId[genresId.length - 1]) {
          genres += GENRES[id];
        } else {
          genres += GENRES[id] + ', ';
        }
      }
    }
    return genres;
  }

  /**
   * In charge to manage the behavior of the pagination
   * @param event: Event of change the page
   */
  changePage(event: IPageChangeEvent): void {
    this.event = event;
    this.registerLoading();
    this.updatePeople(event.page);
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('people');
  }

  resolveLoading(): void {
    this._loadingService.resolve('people');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('movies', value);
  }
}
