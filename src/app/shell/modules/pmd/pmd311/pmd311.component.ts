import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BGValidators} from '../../../../shared/validators';
import {AccountService} from '../../../../shared/account/account.service';
import {AccountResponseModel} from '../../../../shared/account/account-response.model';

@Component({
  selector: 'bg-pmd311',
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.scss']
})
export class Pmd311Component implements OnInit {
  transForm: FormGroup;
  srcAccounts: any;
  dstAccounts: any;
  clientKey: number;

  constructor(private router: Router, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
    this.accountService.getAllAccounts().subscribe(
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
    console.log('transfer works');
    const srcAcctInfo = this.get('senderAccountKey').value.split(' ');
    const dstAcctInfo = this.get('receivedAccountKey').value.split(' ');

    const senderAccountKey = Number(srcAcctInfo[0].trim());
    const receiverAccountKey = Number(dstAcctInfo[0].trim());

    const srcAcctBal = Number(srcAcctInfo[2].replace('GEL', ''));
    const amount = Number(this.get('amount').value);
    if (amount > srcAcctBal) {
      console.log('ანგარიშზე არ არის საკმარისი თანხა');
      return;
    }
    this.accountService.transferMoney(senderAccountKey, receiverAccountKey, amount).subscribe(
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
}
