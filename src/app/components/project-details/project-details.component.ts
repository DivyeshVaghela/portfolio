import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  
  projectId: string;
  project: Project;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.projectService.get(this.projectId)
      .pipe(take(1))
      .subscribe(project => {
        this.project = project;
      });
  }

  isOnlyOneLink(){
    if (this.project){
      if (this.project.github && !this.project.websiteLink && !this.project.androidAppLink)
        return true;
      else if (!this.project.github && this.project.websiteLink && !this.project.androidAppLink)
        return true;
      else if (!this.project.github && !this.project.websiteLink && this.project.androidAppLink)
        return true;
    }
    return false;
  }

  private _technologies = null;
  getTechnologies() {
    if (this._technologies)
      return this._technologies;

    this._technologies = [];
    if (this.project.frontTechnologies)
      this._technologies.push(...this.project.frontTechnologies);
    if (this.project.backTechnologies)
      this._technologies.push(...this.project.backTechnologies);
    if (this.project.database)
      this._technologies.push(...this.project.database);

    return this._technologies;
  }

}
