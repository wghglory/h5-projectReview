import { ReviewService } from './review.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { ReviewProblemCategoryComponent } from './review-problem-category/review-problem-category.component';
import { ReviewProblemComponent } from './review-problem/review-problem.component';
import { ReviewModalComponent } from './review-modal/review-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'reviews', component: ReviewComponent }
      // {
      //   path: 'projects/:id',
      //   canActivate: [ProjectGuardService],
      //   component: ProjectDetailComponent
      // }
    ])
  ],
  declarations: [
    ReviewComponent,
    ReviewProblemCategoryComponent,
    ReviewProblemComponent,
    ReviewModalComponent
  ],
  providers: [ReviewService]
})
export class ReviewModule {}
