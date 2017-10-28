import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewsComponent } from './movie-reviews.component';

describe('MovieReviewsComponent', () => {
  let component: MovieReviewsComponent;
  let fixture: ComponentFixture<MovieReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
