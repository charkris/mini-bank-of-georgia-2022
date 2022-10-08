import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BGValidators} from '../../../../../shared/validators';
import {AccountService} from '../../../../../shared/account/account.service';
import {ClientService} from '../../../../../shared/identify/client.service';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;

  constructor(private router: Router,
              private accountService: AccountService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  addAcount() {
    if (this.accountForm.invalid) {
      return;
    }
    this.accountService.showAcctList.next(true);
    const clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
    const acctName = this.get('accountName').value;
    const acctBal = this.get('amount').value;
    this.accountService.openAccount(clientKey, acctName, acctBal).subscribe(
      resp => this.accountService.getAccounts(clientKey).subscribe(
        result => {
          this.accountService.acctList = result;
          this.clientService.getAuthorizedClientInfo(clientKey).subscribe(
            client => {
              this.clientService.clientInfo = client[0];
            }
          );
        }
      )
    );
    this.router.navigate(['/krn/accounts']);
  }

  get(controlName) {
    return this.accountForm.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors) : [];
  }

  initForm() {
    this.accountForm = new FormGroup({
        accountName: new FormControl(undefined, [BGValidators.required,
          BGValidators.minLength(2), BGValidators.maxLength(30)]),
        amount: new FormControl(undefined, [BGValidators.required], BGValidators.positiveNumbers)
      }
    );
  }


}
