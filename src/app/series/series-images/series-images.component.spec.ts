import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesImagesComponent } from './series-images.component';
import {AppModule} from "../../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

describe('SeriesImagesComponent', () => {
  let component: SeriesImagesComponent;
  let fixture: ComponentFixture<SeriesImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ AppModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: ActivatedRoute, useValue: { params: Observable.from([{id: 66732}]) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
