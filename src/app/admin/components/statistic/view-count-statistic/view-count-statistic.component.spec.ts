import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCountStatisticComponent } from './view-count-statistic.component';

describe('ViewCountStatisticComponent', () => {
  let component: ViewCountStatisticComponent;
  let fixture: ComponentFixture<ViewCountStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCountStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCountStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
