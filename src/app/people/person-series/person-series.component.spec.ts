import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSeriesComponent } from './person-series.component';

describe('PersonSeriesComponent', () => {
  let component: PersonSeriesComponent;
  let fixture: ComponentFixture<PersonSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
