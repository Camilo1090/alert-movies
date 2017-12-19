import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

import * as people from '../../testing/people.json';
import * as personDetails from '../../testing/person-details.json';
import { PeopleService } from './people.service';
import { API } from '../../shared/api/api';

describe('People service test', () => {
  let mockBackend: MockBackend;
  let peopleService: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleService,
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
      peopleService = new PeopleService(http);
    }));

  describe('WHEN the service is created', () => {
    it('should create global variables', inject([PeopleService], (service: PeopleService) => {
      expect(service)
        .toBeTruthy();
      expect(service.peopleUrl)
        .toEqual(API.apiUrl + '3/person');
    }));
  });

  describe('WHEN getPopularPeople function is called', () => {
    it('should return observable with response', (done) => {
      const page = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/person/popular?api_key=' + API.apiKey + '&page=' + page);
        connection.mockRespond(new Response(new ResponseOptions({
          body: people
        })));
      });
      peopleService.getPopularPeople(page).subscribe(result => {
        expect(result).toEqual(people);
        done();
      });
    });
  });

  describe('WHEN getPersonDetails function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/person/' + id + '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: personDetails
        })));
      });
      peopleService.getPersonDetails(id).subscribe(result => {
        expect(result).toEqual(personDetails);
        done();
      });
    });
  });

  describe('WHEN getPersonMovies function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/person/' + id + '/movie_credits' +
            '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: personDetails['movies']
        })));
      });
      peopleService.getPersonMovies(id).subscribe(result => {
        expect(result).toEqual(personDetails['movies']);
        done();
      });
    });
  });

  describe('WHEN getPersonSeries function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/person/' + id + '/tv_credits' +
            '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: personDetails['series']
        })));
      });
      peopleService.getPersonSeries(id).subscribe(result => {
        expect(result).toEqual(personDetails['series']);
        done();
      });
    });
  });

  describe('WHEN getPersonCombinedCredits function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/person/' + id + '/combined_credits' +
            '?api_key=' + API.apiKey + '&language=en-US');
        connection.mockRespond(new Response(new ResponseOptions({
          body: personDetails['movies']
        })));
      });
      peopleService.getPersonCombinedCredits(id).subscribe(result => {
        expect(result).toEqual(personDetails['movies']);
        done();
      });
    });
  });

  describe('WHEN getPersonImages function is called', () => {
    it('should return observable with response', (done) => {
      const id = 1;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method)
          .toEqual(RequestMethod.Get);
        expect(connection.request.url)
          .toEqual(API.apiUrl + '3/person/' + id + '/images' + '?api_key=' + API.apiKey);
        connection.mockRespond(new Response(new ResponseOptions({
          body: personDetails['profiles']
        })));
      });
      peopleService.getPersonImages(id).subscribe(result => {
        expect(result).toEqual(personDetails['profiles']);
        done();
      });
    });
  });
});
