import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review-problem',
  templateUrl: './review-problem.component.html',
  styleUrls: ['./review-problem.component.scss']
})
export class ReviewProblemComponent implements OnInit {
  selected: boolean = false;
  @Input() problem;
  @Output() problemChanged: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}
  problemClick() {
    this.selected = !this.selected;
    this.problemChanged.emit('problemChanged');
  }
  ngOnInit() {}
}
