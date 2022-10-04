import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  showFlag = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log('add account');
    this.router.navigate(['/krn/accounts/create']);
    this.showFlag = false;
  }
}
