import { Component, OnInit, Input } from '@angular/core';

import { take } from 'rxjs/operators';

import { Project } from 'src/app/models/Project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() limit: number;
  @Input() reverse: boolean = true;

  projects: Project[];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    //load Projects
    this.projectService.list(this.reverse, this.limit ? this.limit : null)
      .pipe(take(1))
      .subscribe(projects => {
        this.projects = projects;
      });
  }

}
