import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// api
import { API } from '../../shared/api/api';


@Injectable()
export class MoviesService {
  moviesUrl = API.apiUrl + '3/movie';

  constructor(private http: Http) {  }

  // sends request to API backend
  sendRequest(url: string, args = ''): Observable<any> {
    url += ('?api_key=' + API.apiKey + args);
    return this.http.get(url).map(response => response.json());
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-now-playing
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getPlayingNowMovies(page: number): Observable<any> {
    const url = this.moviesUrl + '/now_playing';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-popular-movies
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getPopularMovies(page: number): Observable<any> {
    const url = this.moviesUrl + '/popular';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-top-rated-movies
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getTopRatedMovies(page: number): Observable<any> {
    const url = this.moviesUrl + '/top_rated';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * https://developers.themoviedb.org/3/movies/get-upcoming
   * @param page: specifies the number of the page for the search
   * @returns {Observable<any>}
   */
  getUpcomingMovies(page: number): Observable<any> {
    const url = this.moviesUrl + '/upcoming';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * obtains the details of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-details
   * @param id: This is the ID of the movie
   * @returns {Observable<R>}: Results with the detail of a movie
   */
  getMovieDetails(id: number): Observable<any> {
    const url = this.moviesUrl + '/' + id;
    const args = '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * obtains the credits of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-credits
   * @param id: This is the ID of the movie
   * @returns {Observable<R>}: Results with the credits of a specific movie
   */
  getMovieCredits(id: number): Observable<any> {
    const url = this.moviesUrl + '/' + id + '/credits';
    const args = '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * obtains the videos of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-videos
   * @param id: This is the ID of the movie
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getMovieVideos(id: number): Observable<any> {
    const url = this.moviesUrl + '/' + id + '/videos';
    return this.sendRequest(url);
  }

  /**
   * obtains the images of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-images
   * @param id: This is the ID of the movie
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getMovieImages(id: number): Observable<any> {
    const url = this.moviesUrl + '/' + id + '/images';
    return this.sendRequest(url);
  }

  /**
   * obtains the reviews of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-images
   * @param id: This is the ID of the movie
   * @param page: page for the query
   * @returns {Observable<any>}: Results with the credits of a specific movie
   */
  getMovieReviews(id: number, page: number): Observable<any> {
    const url = this.moviesUrl + '/' + id + '/reviews';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

  /**
   * obtains the recommendations of a specific movie, for more information of the api TMDB
   * https://developers.themoviedb.org/3/movies/get-movie-recommendations
   * @param id: ID of the movie
   * @param page: page for the query
   * @returns {Observable<any>}: Results with the recommendations of a specific movie
   */
  getMovieRecommendations(id: number, page: number): Observable<any> {
    const url = this.moviesUrl + '/' + id + '/recommendations';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }
}
