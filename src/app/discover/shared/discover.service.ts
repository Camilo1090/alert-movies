import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {sendRequest} from 'selenium-webdriver/http';

// api
import { API } from '../../shared/api/api';

@Injectable()
export class DiscoverService {
  discoverUrl = API.apiUrl + '3/discover';

  constructor(private http: Http) {  }

  sendRequest(url: string, args = ''): Observable<any> {
    url += ('?api_key=' + API.apiKey + args);
    // console.log(url);
    return this.http.get(url).map(response => response.json());
  }

  /**
   * https://developers.themoviedb.org/3/discover/movie
   * @param page: specifies the number of the page for the search
   * @param params: additional optional parameters for the discover request
   * @returns {Observable<any>}
   */
  getDiscoverMovies(page: number, params: Array<{name: string, value: any}> = []): Observable<Array<any>> {
    const url = this.discoverUrl + '/movie';
    let args = '&page=' + page + '&language=en-US';
    for (let i = 0; i < params.length; i++) {
      args += '&' + params[i].name + '=' + params[i].value;
    }
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/discover/movie
   * @param page: specifies the number of the page for the search
   * @param params: additional optional parameters for the discover request
   * @returns {Observable<any>}
   */
  getDiscoverSeries(page: number, params: Array<{name: string, value: any}> = []): Observable<Array<any>> {
    const url = this.discoverUrl + '/tv';
    let args = '&page=' + page + '&language=en-US';
    for (let i = 0; i < params.length; i++) {
      args += '&' + params[i].name + '=' + params[i].value;
    }
    return this.sendRequest(url, args);
  }
}
