import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProblemCategoryComponent } from './review-problem-category.component';

describe('ReviewProblemCategoryComponent', () => {
  let component: ReviewProblemCategoryComponent;
  let fixture: ComponentFixture<ReviewProblemCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewProblemCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewProblemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
