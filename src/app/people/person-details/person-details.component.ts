import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

// Loading service
import { TdLoadingService } from '@covalent/core';

// api
import { API } from '../../shared/api/api';
import { MOVIE_GENRES } from '../../shared/api/genres';

// services
import { PeopleService } from '../shared/people.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  _querySubscription: Subscription;

  apiImgOrig = API.apiImg + 'original';
  apiImgBack = API.apiImg + 'w1400_and_h450_bestv2';
  apiImgProf = API.apiImg + 'w185';
  person = [];
  gender: string;
  featuredCredit: object;

  routes: Object[] = [
    {
      title: 'Movies',
      value: '1',
      icon: 'movie',
    }, {
      title: 'Series',
      value: '2',
      icon: 'tv',
    }, {
      title: 'Images',
      value: '3',
      icon: 'image',
    }
  ];

  currentTab = 1;

  constructor(public peopleService: PeopleService,
              public router: Router,
              public route: ActivatedRoute,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone,
              public _loadingService: TdLoadingService) {
  }

  ngOnInit() {
    this.registerLoading();

    this.updatePersonDetails();

    this.checkScreen();
    this.watchScreen();
  }

  // updates the details of a given person
  updatePersonDetails(): void {
    this.route.params.switchMap((params: Params) => this.peopleService
      .getPersonDetails(params['id']))
      .subscribe(response => {
        this.person = response;
        this.gender = '-';
        if (response['gender'] === 1) {
          this.gender = 'Female';
        } else if (response['gender'] === 2) {
          this.gender = 'Male';
        } else {
          this.gender = '';
        }
        this.updateFeaturedCredit();
      }, err => {
        if (err['status'] === 404) {
          this.router.navigate(['/404']);
        }
        console.log(err);
        this.person = [];
        this.resolveLoading();
      });
  }

  // updates the featured credit for a given person
  updateFeaturedCredit(): void {
    this.route.params.switchMap((params: Params) => this.peopleService
      .getPersonCombinedCredits(params['id']))
      .subscribe(response => {
        this.featuredCredit = response['cast'].sort((a, b) => b['popularity'] - a['popularity'])[0];
        this.resolveLoading();
      }, err => {
        console.log(err);
        this.resolveLoading();
      });
  }

  // gets the age of person according to their birthday
  getAge(dateString: string): number {
    const date1 = Date.parse(dateString);
    const date2 = Date.now();
    const millis = date2 - date1;
    if (millis > 0) {
      return Math.trunc(millis / (1000 * 60 * 60 * 24 * 365));
    } else {
      return 0;
    }
  }

  // changes tab
  changeTab(tab: number): void {
    this.currentTab = tab;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

  /**
   * checks the size of the screen
   */
  checkScreen(): void {
    this._ngZone.run(() => {
      this.isDesktop = this._mediaService.query('gt-sm');
    });
  }

  /**
   * subscribes to the shared 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = matches;
      });
    });
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('person-details');
  }

  resolveLoading(): void {
    this._loadingService.resolve('person-details');
  }
}
