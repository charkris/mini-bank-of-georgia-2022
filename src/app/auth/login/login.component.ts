import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/auth/auth.service';
import {BGValidators} from '../../shared/validators';
import {AlertService} from '../../shared/alert-error/alert.service';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.get('userName').value;
    const password = this.get('password').value;
    this.authService.login(username, password).subscribe(
      (resData) => {
        this.router.navigate(['/bpm/bpm000']);
        this.loginForm.reset();
      },
      (error) => this.alertService.error = error,
    );
  }

  get(controlName) {
    return this.loginForm.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors) : [];
  }

  initForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl(undefined,
        [BGValidators.required,
          BGValidators.pattern(/^\S*$/, 'სფეისების გარეშე'),
          BGValidators.minLength(2),
          BGValidators.maxLength(30),
        ]),
      password: new FormControl(undefined,
        [BGValidators.required,
          BGValidators.minLength(2),
          BGValidators.maxLength(30),
        ])
    });
  }

}
