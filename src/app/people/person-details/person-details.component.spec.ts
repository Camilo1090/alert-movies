import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsComponent } from './person-details.component';
import {AppModule} from "../../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

describe('PersonDetailsComponent', () => {
  let component: PersonDetailsComponent;
  let fixture: ComponentFixture<PersonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ AppModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: ActivatedRoute, useValue: { params: Observable.from([{id: 1}]) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
