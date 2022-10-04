import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-pmd311',
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.scss']
})
export class Pmd311Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    console.log('transfer works');
    this.router.navigate(['/krn/accounts'])
  }
}
