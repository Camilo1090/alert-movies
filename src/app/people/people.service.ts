import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {sendRequest} from 'selenium-webdriver/http';

// api
import { API } from '../static/api';


@Injectable()
export class PeopleService {
  peopleUrl = API.apiUrl + '/3/person';

  constructor(private http: Http) {  }

  sendRequest(url: string, args= ''): Observable<any> {
    url += ('?api_key=' + API.apiKey +
      '&language=en-US' + args);
    return this.http.get(url).map(response => response.json());
  }

  /**
   * https://developers.themoviedb.org/3/person/get-popular-people
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getPopularPeople(page: number): Observable<Array<any>> {
    const url = this.peopleUrl + '/popular';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }
}
