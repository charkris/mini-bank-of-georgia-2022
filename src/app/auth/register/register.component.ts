import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BGValidators} from '../../shared/validators';
import {AuthService} from '../../shared/auth/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-error/alert.service';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error;

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const fullName = this.get('fullName').value;
    const userName = this.get('userName').value;
    const password = this.get('password').value;
    this.authService.registerUser(fullName, userName, password).subscribe(
      (resData) => {
        this.registerForm.reset();
        this.router.navigate(['/bpm/bpm000']);
      }, (error) =>  this.alertService.error = error,
    );
  }

  get(controlName) {
    return this.registerForm.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }

  initForm() {
    this.registerForm = new FormGroup({
        fullName: new FormControl(undefined,
          [BGValidators.required,
            BGValidators.minLength(2),
            BGValidators.maxLength(30)]),
        userName: new FormControl(undefined,
          [BGValidators.required,
            BGValidators.minLength(2),
            BGValidators.maxLength(30),
            BGValidators.pattern(/^\S*$/, 'სფეისების გარეშე'),
          ]),
        password: new FormControl(undefined,
          [BGValidators.required,
            BGValidators.minLength(2),
            BGValidators.maxLength(30)]),
        confirmPassword: new FormControl(undefined,
          [BGValidators.required,
            BGValidators.minLength(2),
            BGValidators.maxLength(30),
          ],
        )
      },
      BGValidators.passMatch('password', 'confirmPassword')
    );
  }
}

