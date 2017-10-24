import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {sendRequest} from 'selenium-webdriver/http';

// api
import { API } from '../static/api';


@Injectable()
export class MoviesService {
  moviesUrl = API.apiUrl + '/3/movie';

  constructor(private http: Http) {  }

  sendRequest(url: string, args= ''): Observable<any> {
    url += ('?api_key=' + API.apiKey +
      '&language=en-US' + args);
    return this.http.get(url).map(response => response.json());
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-now-playing
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getPlayingNow(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/now_playing';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-popular-movies
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getPopularMovies(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/popular';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-top-rated-movies
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getRatedMovies(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/top_rated';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-upcoming
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getRatedUpcoming(page: number): Observable<Array<any>> {
    const url = this.moviesUrl + '/upcoming';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  /**
   * This function obtain the details of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-details
   * @param id: This is the ID of the movie
   * @returns {Observable<R>}: Results with the detail of a movie
   */
  getMovieDetails(id: number): Observable<Array<any>> {
    const url = this.moviesUrl + id;
    return this.sendRequest(url);
  }

  /**
   * This function obtain the credits of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-credits
   * @param id: This is the ID of the movie
   * @returns {Observable<R>}: Results with the credits of a specific movie
   */
  getMovieCredits(id: number): Observable<Array<any>> {
    const url = this.moviesUrl + id + '/credits';
    return this.sendRequest(url);
  }

  /**
   * This function obtain the videos of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-videos
   * @param id: This is the ID of the movie
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getVideos(id: number): Observable<Array<any>> {
    const url = this.moviesUrl + id + '/videos';
    return this.sendRequest(url);
  }

  /**
   * This function obtain the images of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-images
   * @param id: This is the ID of the movie
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getMovieImages(id: number): Observable<Array<any>> {
    const url = this.moviesUrl + id + '/images';
    return this.sendRequest(url);
  }

  /**
   * This function obtain the recommendations of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-recommendations
   * @param id: This is the ID of the movie
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getMovieRecommendations(id: number): Observable<Array<any>> {
    const url = this.moviesUrl + id + '/recommendations';
    return this.sendRequest(url);
  }
}
