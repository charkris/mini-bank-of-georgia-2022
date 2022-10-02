import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-krnicp',
  templateUrl: './krnicp.component.html',
  styleUrls: ['./krnicp.component.scss']
})
export class KrnicpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  endSession() {
    console.log('aaaaaaa');
    this.router.navigate(['bpm/bpm000']);
  }
}
