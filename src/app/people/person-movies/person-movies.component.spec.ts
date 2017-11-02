import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMoviesComponent } from './person-movies.component';

describe('PersonMoviesComponent', () => {
  let component: PersonMoviesComponent;
  let fixture: ComponentFixture<PersonMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
