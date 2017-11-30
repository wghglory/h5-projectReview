import { IReview } from './../review';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review-problem-category',
  templateUrl: './review-problem-category.component.html',
  styleUrls: ['./review-problem-category.component.scss']
})
export class ReviewProblemCategoryComponent implements OnInit {
  selectedProblems: Array<any> = [];
  @Input() review: IReview;
  @Input() selectedReviewId: number;
  @Output() problemCategoryChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() problemsChanged: EventEmitter<Object> = new EventEmitter<Object>();
  constructor() {}

  emitProblemCategory(id) {
    this.problemCategoryChanged.emit(id);
  }
  onProblemChange(id, problem) {
    if (this.selectedProblems.indexOf(problem) > -1) {
      this.selectedProblems.splice(this.selectedProblems.indexOf(problem), 1);
    } else {
      this.selectedProblems.push(problem);
    }
    this.problemsChanged.emit({ reviewId: id, problems: this.selectedProblems });
  }
  ngOnInit() {}
}
