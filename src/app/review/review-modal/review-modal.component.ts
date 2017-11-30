import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent implements OnInit {
  constructor() {}
  @Input() isModalOpen: boolean;
  @Output() modalClosed: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitForm: EventEmitter<string> = new EventEmitter<string>();
  onCloseModal() {
    this.modalClosed.emit('modalClosed');
  }
  onConfirmSubmit() {
    this.submitForm.emit('submitForm');
  }
  ngOnInit() {}
}
