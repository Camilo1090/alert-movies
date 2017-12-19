import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

import * as movies from '../../testing/movies.json';
import * as series from '../../testing/series.json';
import { DiscoverService } from './discover.service';
import { API } from '../../shared/api/api';

describe('Discover service test', () => {
  let mockBackend: MockBackend;
  let discoverService: DiscoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DiscoverService,
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
      discoverService = new DiscoverService(http);
    }));

  describe('WHEN the service is created', () => {
    it('should create global variables', inject([DiscoverService], (service: DiscoverService) => {
      expect(service)
        .toBeTruthy();
      expect(service.discoverUrl)
        .toEqual(API.apiUrl + '3/discover');
    }));
  });

  describe('WHEN getDiscoverMovies function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      const params = [{name: 'sort_by', value: 'rating.desc'}];
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/discover/movie?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US&' + params[0].name + '=' + params[0].value);
        connection.mockRespond(new Response(new ResponseOptions({
          body: movies
        })));
      });
      discoverService.getDiscoverMovies(page, params).subscribe(result => {
        expect(result).toEqual(movies);
        done();
      });
    });
  });

  describe('WHEN getDiscoverSeries function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      const params = [{name: 'sort_by', value: 'rating.desc'}];
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/discover/tv?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US&' + params[0].name + '=' + params[0].value);
        connection.mockRespond(new Response(new ResponseOptions({
          body: series
        })));
      });
      discoverService.getDiscoverSeries(page, params).subscribe(result => {
        expect(result).toEqual(series);
        done();
      });
    });
  });
});
