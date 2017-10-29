import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {sendRequest} from 'selenium-webdriver/http';

// api
import { API } from '../static/api';


@Injectable()
export class SeriesService {
  seriesUrl = API.apiUrl + '/3/tv';

  constructor(private http: Http) {  }

  sendRequest(url: string, args= ''): Observable<any> {
    url += ('?api_key=' + API.apiKey + args);
    return this.http.get(url).map(response => response.json());
  }

  /**
   * https://developers.themoviedb.org/3/tv/get-on-the-air
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getOnTheAirSeries(page: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/on_the_air';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/tv/get-popular-tv-shows
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getPopularSeries(page: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/popular';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-top-rated-tv
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getTopRatedSeries(page: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/top_rated';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-latest-tv
   * @param page: This specified the number of the page for the search
   * @returns {Observable<any>}
   */
  getLatestSeries(page: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/latest';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-latest-tv
   * @param id: id of the series
   * @returns {Observable<any>}
   */
  getSeriesDetails(id: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/' + id;
    const args = '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-latest-tv
   * @param id: id of the series
   * @returns {Observable<any>}
   */
  getSeriesCredits(id: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/' + id + '/credits';
    const args = '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * obtains the videos of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-videos
   * @param id: This is the ID of the movie
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getSeriesVideos(id: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/' + id + '/videos';
    return this.sendRequest(url);
  }

  /**
   * obtains the images of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-images
   * @param id: This is the ID of the movie
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getSeriesImages(id: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/' + id + '/images';
    return this.sendRequest(url);
  }

  /**
   * obtains the recommendations of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-recommendations
   * @param id: ID of the movie
   * @param page: page for the query
   * @returns {Observable<any>}: Results with the recommendations of a specific movie
   */
  getSeriesRecommendations(id: number, page: number): Observable<Array<any>> {
    const url = this.seriesUrl + '/' + id + '/recommendations';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }
}
