import { ProjectService } from './../project.service';
import { Observable } from 'rxjs/Observable';
import { baseUrl } from './../../../utils/api';
import { IProject } from './../project';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(private _router: Router, private _projectService: ProjectService) {}
  errorMessage: string = '';
  showReviewed: boolean = false;
  projects: IProject[] = [];
  unReviewedProjects: IProject[] = [];
  reviewedProjects: Array<IProject> = [];

  goToProjectDetail(id): void {
    this._router.navigate([`/projects/${id}`]);
  }

  ngOnInit() {
    this._projectService.getProjects().subscribe((projects) => {
      this.projects = projects;

      projects.forEach((p) => {
        if (p.reviewed) {
          this.reviewedProjects.push(p);
        } else {
          this.unReviewedProjects.push(p);
        }
      });
    }, (error) => (this.errorMessage = <any>error));
  }
}
