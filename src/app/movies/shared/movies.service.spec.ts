import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

import * as movies from '../../testing/movies.json';
import * as movieDetails from '../../testing/movie-details.json';
import { MoviesService } from './movies.service';
import { API } from '../../shared/api/api';

describe('Movies service test', () => {
  let mockBackend: MockBackend;
  let moviesService: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  beforeEach(inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      moviesService = new MoviesService(http);
    }));

  describe('WHEN the service is created', () => {
    it('should create global variables', inject([MoviesService], (service: MoviesService) => {
      expect(service)
        .toBeTruthy();
      expect(service.moviesUrl)
        .toEqual(API.apiUrl + '3/movie');
    }));
  });

  describe('WHEN getPlayingNowMovies function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/now_playing?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      moviesService.getPlayingNowMovies(page).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });

  describe('WHEN getPopularMovies function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/popular?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      moviesService.getPopularMovies(page).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });

  describe('WHEN getTopRatedMovies function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/top_rated?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      moviesService.getTopRatedMovies(page).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });

  describe('WHEN getUpcomingMovies function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/upcoming?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      moviesService.getUpcomingMovies(page).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });

  describe('WHEN getMovieDetails function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/' + id + '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movieDetails
        })));
      });
      moviesService.getMovieDetails(id).subscribe(result => {
        expect(result).toEqual(movieDetails);
        done();
      });
    });
  });

  describe('WHEN getMovieCredits function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/' + id + '/credits' + '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movieDetails['cast']
        })));
      });
      moviesService.getMovieCredits(id).subscribe(result => {
        expect(result).toEqual(movieDetails['cast']);
        done();
      });
    });
  });

  describe('WHEN getMovieVideos function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/' + id + '/videos' + '?api_key=' + API.apiKey);
        connection.mockRespond(new Response(new ResponseOptions({
          body: movieDetails['videos']
        })));
      });
      moviesService.getMovieVideos(id).subscribe(result => {
        expect(result).toEqual(movieDetails['videos']);
        done();
      });
    });
  });

  describe('WHEN getMovieImages function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/' + id + '/images' + '?api_key=' + API.apiKey);
        connection.mockRespond(new Response(new ResponseOptions({
          body: movieDetails['backdrops']
        })));
      });
      moviesService.getMovieImages(id).subscribe(result => {
        expect(result).toEqual(movieDetails['backdrops']);
        done();
      });
    });
  });

  describe('WHEN getMovieReviews function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/' + id + '/reviews' + '?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movieDetails['reviews']
        })));
      });
      moviesService.getMovieReviews(id, page).subscribe(result => {
        expect(result).toEqual(movieDetails['reviews']);
        done();
      });
    });
  });

  describe('WHEN getMovieRecommendations function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/movie/' + id + '/recommendations' + '?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      moviesService.getMovieRecommendations(id, page).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });
});
