import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';

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
  declarations: [ReviewComponent]
})
export class ReviewModule {}
