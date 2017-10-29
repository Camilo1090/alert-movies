import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieImagesComponent } from './movie-images.component';
import {AppModule} from "../../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

describe('MovieImagesComponent', () => {
  let component: MovieImagesComponent;
  let fixture: ComponentFixture<MovieImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ AppModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: ActivatedRoute, useValue: { params: Observable.from([{id: 346364}]) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
