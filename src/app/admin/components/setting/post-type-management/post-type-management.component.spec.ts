import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTypeManagementComponent } from './post-type-management.component';

describe('PostTypeManagementComponent', () => {
  let component: PostTypeManagementComponent;
  let fixture: ComponentFixture<PostTypeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTypeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
