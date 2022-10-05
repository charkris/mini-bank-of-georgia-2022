import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {BGValidators} from '../../../../../shared/validators';
import {error} from 'protractor';
import {AccountService} from '../../../../../shared/account/account.service';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;

  constructor(private router: Router, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  addAcount() {
    if (this.accountForm.invalid) {
      return;
    }
    console.log('account add works');
    const clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
    const acctName = this.get('accountName').value;
    const acctBal = this.get('amount').value;
    this.accountService.openAccount(clientKey, acctName, acctBal).subscribe(
      // resp => console.log(resp)
    );
    this.router.navigate(['krn/accounts']);
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
