import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

import * as movies from '../../testing/movies.json';
import * as series from '../../testing/series.json';
import * as people from '../../testing/people.json';
import { SearchService } from './search.service';
import { API } from '../../shared/api/api';

describe('Search service test', () => {
  let mockBackend: MockBackend;
  let searchService: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
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
      searchService = new SearchService(http);
    }));

  describe('WHEN the service is created', () => {
    it('should create global variables', inject([SearchService], (service: SearchService) => {
      expect(service)
        .toBeTruthy();
      expect(service.searchUrl)
        .toEqual(API.apiUrl + '3/search');
    }));
  });

  describe('WHEN searchMulti function is called', () => {
    it('should return observable with response', (done) => {
      const query = 'term';
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/search/multi?api_key=' + API.apiKey + '&language=en-US' +
            '&page=' + page + '&query=' + query + '&include_adult=false');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      searchService.searchMulti(query, page).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });

  describe('WHEN searchPeople function is called', () => {
    it('should return observable with response', (done) => {
      const query = 'term';
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/search/person?api_key=' + API.apiKey + '&language=en-US' +
            '&page=' + page + '&query=' + query + '&include_adult=false');
        connection.mockRespond(new Response(new ResponseOptions({
          body: people
        })));
      });
      searchService.searchPeople(query, page).subscribe(result => {
        expect(result).toEqual(people);
        done();
      });
    });
  });

  describe('WHEN searchMovies function is called', () => {
    it('should return observable with response', (done) => {
      const query = 'term';
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/search/movie?api_key=' + API.apiKey + '&language=en-US' +
            '&page=' + page + '&query=' + query + '&include_adult=false');
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      searchService.searchMovies(query, page).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });

  describe('WHEN searchSeries function is called', () => {
    it('should return observable with response', (done) => {
      const query = 'term';
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/search/tv?api_key=' + API.apiKey + '&language=en-US' +
            '&page=' + page + '&query=' + query + '&include_adult=false');
        connection.mockRespond(new Response(new ResponseOptions({
          body: series
        })));
      });
      searchService.searchSeries(query, page).subscribe(result => {
        expect(result).toEqual(series);
        done();
      });
    });
  });
});
