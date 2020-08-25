import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewCountStatisticComponent } from './most-view-count-statistic.component';

describe('MostViewCountStatisticComponent', () => {
  let component: MostViewCountStatisticComponent;
  let fixture: ComponentFixture<MostViewCountStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewCountStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewCountStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
