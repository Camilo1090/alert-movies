import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesRecommendationsComponent } from './series-recommendations.component';

describe('SeriesRecommendationsComponent', () => {
  let component: SeriesRecommendationsComponent;
  let fixture: ComponentFixture<SeriesRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
