import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../../shared/account/account.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})


export class AccountsComponent implements OnInit, OnDestroy {
  clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
  accounts: any;
  showFlag: any;

  mySubscrip: Subscription;

  constructor(private router: Router, public accountService: AccountService) {
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
    this.mySubscrip = this.accountService.closeAccount(acctKey).subscribe(
      resp => {
        this.accountService.getAccounts(this.clientKey).subscribe(
          accList => this.accountService.acctList = accList,
        );
        return this.accountService.acctList;
      }
    );
  }

  accountList() {
    this.mySubscrip = this.accountService.getAccounts(this.clientKey)
      .subscribe(resp => {
        this.accountService.acctList = resp;
      });
    return this.accountService.acctList;
  }

  ngOnDestroy() {
    this.mySubscrip.unsubscribe();
  }
}
