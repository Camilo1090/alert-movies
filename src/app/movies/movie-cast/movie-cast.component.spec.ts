import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCastComponent } from './movie-cast.component';

describe('MovieCastComponent', () => {
  let component: MovieCastComponent;
  let fixture: ComponentFixture<MovieCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCastComponent ]
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
