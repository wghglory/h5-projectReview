import { ProjectService } from './../project.service';
import { IProject } from './../project';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { formatTime } from '../../../utils/tools';
import { getProject } from '../../../utils/api';

@Component({
  // selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @ViewChild('audioEle') audioEle: ElementRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _projectService: ProjectService
  ) {}
  project: IProject = { id: -1, name: '', reviewed: false };
  playing: boolean = false;
  currentTime: number = 0;
  duration: number = 0.1;
  timer = null;
  formatTime = formatTime;
  // todo: how to watch these 2 props, like computed properties in Vue.
  // other solution: create filter
  // formattedCurrentTime: string = formatTime(this.currentTime);
  // formattedDuration: string = formatTime(this.duration);

  togglePlay() {
    if (this.playing) {
      this.playing = false;
      this.audioEle.nativeElement.pause();
      clearInterval(this.timer);
    } else {
      this.playing = true;
      this.timer = setInterval(() => {
        this.duration = this.audioEle.nativeElement.duration;
        this.currentTime = this.audioEle.nativeElement.currentTime;
      }, 1000);
      this.audioEle.nativeElement.play();
    }
  }
  goToReview() {
    const projectId = this._route.snapshot.paramMap.get('id');
    this._router.navigate([`/reviews`], { queryParams: { projectId: projectId } });
  }

  ngOnInit() {
    const projectId = this._route.snapshot.paramMap.get('id');
    this._projectService.getProject(projectId).subscribe((res) => {
      this.project = res.project;
    });
  }

  ngAfterViewInit() {
    // console.log(this.audioEle.nativeElement);
  }
}
