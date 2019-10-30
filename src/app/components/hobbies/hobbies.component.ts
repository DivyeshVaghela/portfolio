import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {

  @Input() showHeader: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
