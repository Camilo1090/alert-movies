import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

import * as series from '../../testing/series.json';
import * as seriesDetails from '../../testing/series-details.json';
import { SeriesService } from './series.service';
import { API } from '../../shared/api/api';

describe('Series service test', () => {
  let mockBackend: MockBackend;
  let seriesService: SeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeriesService,
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
      seriesService = new SeriesService(http);
    }));

  describe('WHEN the service is created', () => {
    it('should create global variables', inject([SeriesService], (service: SeriesService) => {
      expect(service)
        .toBeTruthy();
      expect(service.seriesUrl)
        .toEqual(API.apiUrl + '3/tv');
    }));
  });

  describe('WHEN getOnTheAirSeries function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/on_the_air?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: series
        })));
      });
      seriesService.getOnTheAirSeries(page).subscribe(result => {
        expect(result).toEqual(series);
        done();
      });
    });
  });

  describe('WHEN getPopularSeries function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/popular?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: series
        })));
      });
      seriesService.getPopularSeries(page).subscribe(result => {
        expect(result).toEqual(series);
        done();
      });
    });
  });

  describe('WHEN getTopRatedSeries function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/top_rated?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: series
        })));
      });
      seriesService.getTopRatedSeries(page).subscribe(result => {
        expect(result).toEqual(series);
        done();
      });
    });
  });

  describe('WHEN getLatestSeries function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/latest?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: series
        })));
      });
      seriesService.getLatestSeries(page).subscribe(result => {
        expect(result).toEqual(series);
        done();
      });
    });
  });

  describe('WHEN getSeriesDetails function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/' + id + '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: seriesDetails
        })));
      });
      seriesService.getSeriesDetails(id).subscribe(result => {
        expect(result).toEqual(seriesDetails);
        done();
      });
    });
  });

  describe('WHEN getSeriesCredits function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/' + id + '/credits' + '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: seriesDetails['cast']
        })));
      });
      seriesService.getSeriesCredits(id).subscribe(result => {
        expect(result).toEqual(seriesDetails['cast']);
        done();
      });
    });
  });

  describe('WHEN getSeriesVideos function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/' + id + '/videos' + '?api_key=' + API.apiKey);
        connection.mockRespond(new Response(new ResponseOptions({
          body: seriesDetails['videos']
        })));
      });
      seriesService.getSeriesVideos(id).subscribe(result => {
        expect(result).toEqual(seriesDetails['videos']);
        done();
      });
    });
  });

  describe('WHEN getSeriesImages function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/' + id + '/images' + '?api_key=' + API.apiKey);
        connection.mockRespond(new Response(new ResponseOptions({
          body: seriesDetails['backdrops']
        })));
      });
      seriesService.getSeriesImages(id).subscribe(result => {
        expect(result).toEqual(seriesDetails['backdrops']);
        done();
      });
    });
  });

  describe('WHEN getSeriesRecommendations function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/tv/' + id + '/recommendations' + '?api_key=' + API.apiKey +
            '&page=' + page + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: series
        })));
      });
      seriesService.getSeriesRecommendations(id, page).subscribe(result => {
        expect(result).toEqual(series);
        done();
      });
    });
  });
});
