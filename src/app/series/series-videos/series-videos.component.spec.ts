import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesVideosComponent } from './series-videos.component';

describe('SeriesVideosComponent', () => {
  let component: SeriesVideosComponent;
  let fixture: ComponentFixture<SeriesVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesVideosComponent ]
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
