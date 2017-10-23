import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {sendRequest} from 'selenium-webdriver/http';

// api
import { API } from '../static/api';


@Injectable()
export class TrendingService {
  moviesUrl = API.apiUrl + '/3/movie';
  seriesUrl = API.apiUrl + '/3/tv';

  constructor(private http: Http) {  }

  sendRequest(url: string, args= ''): Observable<any> {
    url += ('?api_key=' + API.apiKey +
      '&language=en-US' + args);
    return this.http.get(url).map(response => response.json());
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-now-playing
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getPlayingNow(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/now_playing';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-popular-movies
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getPopularMovies(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/popular';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-popular-movies
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getPopularSeries(page: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/popular';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-top-rated-movies
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getRatedMovies(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/top_rated';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-upcoming
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getRatedUpcoming(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/upcoming';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }
}
