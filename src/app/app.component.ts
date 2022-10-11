import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Levan';

  constructor() {
  }

  ngOnInit() {
  }

}
