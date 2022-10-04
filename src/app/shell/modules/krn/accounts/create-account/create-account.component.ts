import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log('account add works');
    this.router.navigate(['krn/accounts']);
  }
}
