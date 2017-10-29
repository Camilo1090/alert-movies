import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesVideosComponent } from './series-videos.component';
import {AppModule} from "../../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

describe('SeriesVideosComponent', () => {
  let component: SeriesVideosComponent;
  let fixture: ComponentFixture<SeriesVideosComponent>;

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
    fixture = TestBed.createComponent(SeriesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
