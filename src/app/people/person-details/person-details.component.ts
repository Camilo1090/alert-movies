import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

// pagination
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

// Load service
import { TdLoadingService } from '@covalent/core';

// api
import { API} from '../../static/api';
import { GENRES } from '../../static/genres';

// services
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
  providers: [ PeopleService, TdMediaService ]
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  // Used for responsive services
  isDesktop = false;
  private _querySubscription: Subscription;

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

  constructor(private peopleService: PeopleService,
              private router: Router,
              private route: ActivatedRoute,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _loadingService: TdLoadingService) {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe(() => {
        window.scroll(0, 0);
      });
  }

  ngOnInit() {
    this.registerLoading();

    this.updatePerson();
    this.updateFeaturedCredit();

    this.checkScreen();
    this.watchScreen();
  }

  updatePerson(): void {
    this.route.params.switchMap((params: Params) => this.peopleService
      .getPersonDetails(params['id']))
      .subscribe(response => {
        this.person = response;
        this.gender = '-';
        if (response['gender'] === 1) {
          this.gender = 'Female';
        }
        if (response['gender'] === 2) {
          this.gender = 'Male';
        }
        this.resolveLoading();
      }, err => {
        console.log(err);
      });
  }

  updateFeaturedCredit(): void {
    this.route.params.switchMap((params: Params) => this.peopleService
      .getPersonCombinedCredits(params['id']))
      .subscribe(response => {
        console.log(response);
        this.featuredCredit = response['cast'].sort((a, b) => b['popularity'] - a['popularity'])[0];
        console.log(this.featuredCredit);
        this.resolveLoading();
      }, err => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
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
   * subscribes the service 'TdMediaService' to detect changes on the size of the screen
   */
  watchScreen(): void {
    this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isDesktop = matches;
      });
    });
  }

  /**
   * gets an array of genres and returns them separated by commas
   * @param genres: Array of genres
   * @returns {string}: List of genres separated by comma
   */
  getGenre(genres: Array<any>): string {
    let names = '';
    if (genres) {
      for (const genre of genres) {
        if (genre === genres[genres.length - 1]) {
          names += genre['name'];
        } else {
          names += genre['name'] + ', ';
        }
      }
    }
    return names;
  }

  /**
   * gets the time in minutes and returns it in HH:mm format
   * @param minutes: Integer with the minutes
   * @returns {string}: Time with the new format
   */
  convertTime(minutes: number): string {
    let text = '';
    if (minutes) {
      text += Math.floor(minutes / 60) + 'h ';
      if (minutes % 60 !== 0) {
        text += (minutes % 60) + 'min';
      }
    }

    return text;
  }

  /**
   * gets a budget and returns it formatted
   * @param budget: Integer with the budget
   * @returns {string}: Budget with the new format
   */
  convertMoney(budget: number): string {
    let text = '$';
    if (budget) {
      const buffer = '' + budget;
      for (let _i = 0; _i < buffer.length; _i++) {
        if (_i % 3 === 0 && _i !== 0) {
          text += ',' + buffer[_i];
        } else {
          text += buffer[_i];
        }
      }
    }
    return text;
  }

  changeTab(tab: number): void {
    this.currentTab = tab;
  }

  // Methods for the loading
  registerLoading(): void {
    this._loadingService.register('person-details');
  }

  resolveLoading(): void {
    this._loadingService.resolve('person-details');
  }

  changeValue(value: number): void { // Usage only enabled on [LoadingMode.Determinate] mode.
    this._loadingService.setValue('personDetails', value);
  }

}
