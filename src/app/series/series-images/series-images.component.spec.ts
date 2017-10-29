import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesImagesComponent } from './series-images.component';

describe('SeriesImagesComponent', () => {
  let component: SeriesImagesComponent;
  let fixture: ComponentFixture<SeriesImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesImagesComponent ]
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
