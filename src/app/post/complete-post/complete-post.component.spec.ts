import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePostComponent } from './complete-post.component';

describe('CompletePostComponent', () => {
  let component: CompletePostComponent;
  let fixture: ComponentFixture<CompletePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
