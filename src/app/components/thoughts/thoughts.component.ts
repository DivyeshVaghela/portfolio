import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'thoughts',
  templateUrl: './thoughts.component.html',
  styleUrls: ['./thoughts.component.scss']
})
export class ThoughtsComponent implements OnInit {

  @Input() showHeader: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
