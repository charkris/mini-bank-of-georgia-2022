import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../../shared/account/account.service';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})


export class AccountsComponent implements OnInit {
  showFlag = true;
  clientKey: number;
  accounts: any;

  constructor(private router: Router, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
    this.accountService.getAccounts(this.clientKey).subscribe(resp => {
      // console.log(resp);
      this.accounts = resp;
    });
  }

  onClick() {
    this.router.navigate(['/krn/accounts/create']);
    this.showFlag = false;
  }

  onDelete(acctKey) {
    this.accountService.closeAccount(acctKey).subscribe(
      resp => {
        // console.log(resp);
        this.accounts.splice(this.accounts.indexOf(resp), 1);
      }
    );
  }
}
