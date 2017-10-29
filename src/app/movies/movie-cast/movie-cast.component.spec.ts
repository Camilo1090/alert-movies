import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCastComponent } from './movie-cast.component';
import {AppModule} from "../../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

describe('MovieCastComponent', () => {
  let component: MovieCastComponent;
  let fixture: ComponentFixture<MovieCastComponent>;

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
    fixture = TestBed.createComponent(MovieCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
