import { Component, OnInit, Input } from '@angular/core';

import { take } from 'rxjs/operators';

import { TimelineItem } from 'src/app/models/TimelineItem.model';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() showHeader: boolean = true;
  @Input() reverse: boolean = true;

  timeline: TimelineItem[];

  constructor(
    private timelineService: TimelineService
  ) { }

  ngOnInit() {
    this.timelineService.list(this.reverse)
      .pipe(take(1))
      .subscribe(timeline => {
        this.timeline = timeline;
      });
  }

}
