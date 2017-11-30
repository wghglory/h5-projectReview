import { ActivatedRoute } from '@angular/router';
import { ReviewService } from './review.service';
import { ModalHelper } from './../../utils/tools';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @ViewChild('scorebar') scorebar: ElementRef;
  currentScore: number = 50;
  reviews: Array<any> = [];
  selectedReviewId: number = -1;
  selectedProblems: Object = {};
  comment: string = '';
  isModalOpen: boolean = false;

  constructor(private _reviewService: ReviewService, private _route: ActivatedRoute) {}
  updateScore(operator) {
    if (operator === '+') {
      this.currentScore += 1;
    } else {
      this.currentScore -= 1;
    }
    if (this.currentScore > 100) {
      this.currentScore = 100;
    } else if (this.currentScore < 0) {
      this.currentScore = 0;
    }
  }
  touchStart(e) {
    // 按下：改变绿条宽度、得分
    if (e.touches.length !== 1) {
      e.preventDefault();
    }
    const prevClientX = e.targetTouches[0].clientX; // 初始按下位置
    // 按下瞬间绿条宽度变化，其右侧和鼠标按下位置一齐
    // e.target.style.width = prevClientX - this.scorebar.offsetLeft + 'px';
    // 按下瞬间计算当前位置的分数
    // currentScore: Math.floor(e.target.offsetWidth / pWidth * 100)
    this.currentScore = Math.floor(
      (prevClientX - this.scorebar.nativeElement.offsetLeft) /
        this.scorebar.nativeElement.clientWidth *
        100
    );
  }
  touchMove(e) {
    const pWidth = this.scorebar.nativeElement.clientWidth;
    const touch = e.targetTouches[0];
    // 如果鼠标滑动到 parentNode 之外，阻止之后代码
    if (
      touch.clientX < this.scorebar.nativeElement.offsetLeft ||
      touch.clientX > this.scorebar.nativeElement.offsetLeft + pWidth
    ) {
      return false;
    }
    const greenWidth = touch.clientX - this.scorebar.nativeElement.offsetLeft;
    // e.target.style.width = touch.clientX - this.scorebar.offsetLeft + 'px'; // 绿色宽度 = 鼠标位置 - 滚动条左侧到屏幕左侧距离
    // 左侧边界
    if (e.target.offsetWidth <= 0) {
      this.currentScore = 0;
      // e.target.style.width = 0;
    }
    // 右侧边界
    if (e.target.offsetWidth >= pWidth) {
      this.currentScore = 100;
      // e.target.style.width = pWidth + 'px';
    }
    // 更新分数
    this.currentScore = Math.floor(greenWidth / this.scorebar.nativeElement.clientWidth * 100);
  }
  touchEnd(e): void {
    e.target.removeEventListener('touchmove', this.touchMove);
    e.target.removeEventListener('touchend', this.touchMove);
  }
  // 子级向 siblings 通信，更新 problemCateogry
  // 子级 li click 更新 parent state，此状态通过 props 传到 siblings，selectedReviewId 和 siblings id 对比判断状态
  onProblemCategoryToggle(data) {
    // 如果还是选中刚才选中的li，则 toggle 它，此时没有选中任何 li
    if (data === this.selectedReviewId) {
      this.selectedReviewId = -1;
    } else {
      this.selectedReviewId = data;
    }
  }
  onProblemsChange(data) {
    const { reviewId, problems } = data;
    this.selectedProblems[reviewId] = problems;
  }
  onOpenModal() {
    this.isModalOpen = true;
    ModalHelper.afterOpen();
  }
  onCloseModal() {
    this.isModalOpen = false;
    ModalHelper.beforeClose();
  }
  onFormSubmit() {
    const score = this.currentScore;
    const problems = Object.values(this.selectedProblems);
    const comment = this.comment;
    const searchParam = this._route.snapshot.queryParamMap.get('projectId');
    alert(
      `score:${score}, problems:${problems.join(
        '|'
      )}, comment:${comment}, projectId: ${searchParam}`
    );
    this.onCloseModal();
  }
  ngOnInit() {
    const projectId = this._route.snapshot.queryParams.projectId;
    this._reviewService.getReviews(projectId).subscribe((res) => {
      this.reviews = res;
    });
  }

  ngAfterViewInit() {
    // console.log(this.scorebar.nativeElement);
  }
}
