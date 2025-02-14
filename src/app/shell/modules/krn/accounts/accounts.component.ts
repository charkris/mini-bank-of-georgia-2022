import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../../shared/account/account.service';
import {Subscription} from 'rxjs';
import {ClientService} from '../../../../shared/identify/client.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})


export class AccountsComponent implements OnInit {
  accounts: any;
  showFlag: any;
  mySubscrip: Subscription;
  clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;

  constructor(private router: Router,
              public accountService: AccountService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.showFlag = true;
    this.accountService.showAcctList.subscribe(
      res => {
        this.showFlag = res;
      }
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
        this.clientService.getAuthorizedClientInfo(this.clientKey).subscribe(
          client => {
            this.clientService.clientInfo = client[0];
          }
        );
        return this.accountService.acctList;
      }
    );
  }

  accountList() {
    this.accountService.getAccounts(this.clientKey)
      .subscribe(resp => {
          this.accountService.acctList = resp;
          this.clientService.getAuthorizedClientInfo(this.clientKey).subscribe(
            client => {
              this.clientService.clientInfo = client[0];
            }
          );
        }
      );
    return this.accountService.acctList;
  }

}
