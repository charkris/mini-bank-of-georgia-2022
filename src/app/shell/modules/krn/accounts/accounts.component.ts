import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../../shared/account/account.service';
import {any} from 'codelyzer/util/function';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})


export class AccountsComponent implements OnInit, OnDestroy {
  clientKey: number;
  accounts: any;
  showFlag: any;

  mySubscrip: Subscription;

  constructor(private router: Router, private accountService: AccountService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showFlag = true;
    this.accountService.showAcctList.subscribe(
      res => this.showFlag = res,
    );
    this.accountList();

  }

  onClick() {
    this.router.navigate(['/krn/accounts/create']);
    this.showFlag = false;
  }

  onDelete(acctKey) {
    this.accountService.closeAccount(acctKey).subscribe(
      resp => {
        console.log(resp);
        this.accounts.splice(this.accounts.indexOf(resp), 1);
      }
    );
  }

  accountList() {
    this.clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
    this.mySubscrip = this.accountService.getAccounts(this.clientKey).subscribe(resp => {
      // console.log(resp);
      this.accounts = resp;
    });
  }

  ngOnDestroy() {
    this.mySubscrip.unsubscribe();
  }
}
