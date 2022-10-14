import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BGValidators} from '../../../../shared/validators';
import {AccountService} from '../../../../shared/account/account.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../../../../shared/alert-error/alert.service';

@Component({
  selector: 'bg-pmd311',
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.scss']
})
export class Pmd311Component implements OnInit, OnDestroy {
  transForm: FormGroup;
  transferSub: Subscription;
  srcAccounts: any;
  dstAccounts: any;
  clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;

  constructor(private router: Router,
              private accountService: AccountService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.transferSub = this.accountService.getAllAccounts().subscribe(
      (resp) => this.dstAccounts = resp,
    );
    this.accountService.getAccounts(this.clientKey).subscribe(
      (resp) => this.srcAccounts = resp,
    );
  }

  onTransfer() {
    if (this.transForm.invalid) {
      return;
    }
    const srcAcctInfo = this.get('senderAccountKey').value.split(' ');
    const dstAcctInfo = this.get('receivedAccountKey').value.split(' ');
    const senderAccountKey = Number(srcAcctInfo[0].trim());
    const receiverAccountKey = Number(dstAcctInfo[0].trim());
    const amount = Number(this.get('amount').value);

    this.accountService.transferMoney(senderAccountKey, receiverAccountKey, amount).subscribe(
      resp => this.accountService.getAccounts(this.clientKey).subscribe(
        acctList => this.accountService.acctList = acctList,
      ),
      (error) => {
        this.alertService.error = error;
        this.router.navigate(['/pmd/pmd311'])
      },
    );
    this.router.navigate(['/krn/accounts']);
  }

  get(controlName) {
    return this.transForm.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors) : [];
  }

  initForm() {
    this.transForm = new FormGroup({
      senderAccountKey: new FormControl(undefined, [BGValidators.required]),
      receivedAccountKey: new FormControl(undefined, [BGValidators.required]),
      amount: new FormControl(undefined, [BGValidators.required], BGValidators.positiveNumbers)
    });
  }

  ngOnDestroy() {
    this.transferSub.unsubscribe();
  }
}
