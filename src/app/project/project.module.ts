import { ProjectService } from './project.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailComponent }
      // {
      //   path: 'projects/:id',
      //   canActivate: [ProjectGuardService],
      //   component: ProjectDetailComponent
      // }
    ])
  ],
  declarations: [ProjectListComponent, ProjectDetailComponent],
  providers: [ProjectService]
})
export class ProjectModule {}
