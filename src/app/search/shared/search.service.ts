import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// api
import { API } from '../../shared/api/api';

@Injectable()
export class SearchService {
  searchUrl = API.apiUrl + '3/search';

  constructor(private http: Http) {  }

  // sends request to API backend
  sendRequest(url: string, args= ''): Observable<any> {
    url += ('?api_key=' + API.apiKey + '&language=en-US' + args);
    return this.http.get(url).map(response => response.json());
  }

  /**
   * searches for movies, series and people
   * https://developers.themoviedb.org/3/search/multi-search
   * @param query: This is the text to do the search
   * @param page
   * @returns {Observable<any>}: This is an observable with the response
   */
  searchMulti(query: string, page: number): Observable<any> {
    const url = this.searchUrl + '/multi';
    const args = '&page=' + page +
      '&query=' + query +
      '&include_adult=false';
    return this.sendRequest(url, args);
  }

  /**
   * searches for people
   * https://developers.themoviedb.org/3/search/search-people
   * @param query: This is the text to do the search
   * @param page
   * @returns {Observable<any>}: This is an observable with the response
   */
  searchPeople(query: string, page: number): Observable<any> {
    const url = this.searchUrl + '/person';
    const args = '&page=' + page +
      '&query=' + query +
      '&include_adult=false';
    return this.sendRequest(url, args);
  }

  /**
   * searches for movies
   * https://developers.themoviedb.org/3/search/search-movies
   * @param query: query: This is the text to do the search
   * @param page
   * @returns {Observable<any>}: This is an observable with the response
   */
  searchMovies(query: string, page: number): Observable<any> {
    const url = this.searchUrl + '/movie';
    const args = '&page=' + page +
      '&query=' + query +
      '&include_adult=false';
    return this.sendRequest(url, args);
  }

  /**
   * searches for series
   * https://developers.themoviedb.org/3/search/search-tv-shows
   * @param query: query: This is the text to do the search
   * @param page
   * @returns {Observable<any>}: This is an observable with the response
   */
  searchSeries(query: string, page: number): Observable<any> {
    const url = this.searchUrl + '/tv';
    const args = '&page=' + page +
      '&query=' + query +
      '&include_adult=false';
    return this.sendRequest(url, args);
  }

}
