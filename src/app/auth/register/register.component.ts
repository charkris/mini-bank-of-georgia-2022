import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BGValidators} from '../../shared/validators';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error;

  constructor(private  authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onRegister() {
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    const fullName = this.get('fullName').value;
    const userName = this.get('userName').value;
    const password = this.get('password').value;
    const confirmPassword = this.get('confirmPassword').value;

    console.log('დარეგისტრირდა');
    console.log(fullName, userName, password, confirmPassword);
  }

  get(controlname) {
    return this.registerForm.get(controlname);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }

  initForm() {
    this.registerForm = new FormGroup({
      fullName: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)]),
      userName: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30),
          BGValidators.pattern(/^\S*$/, 'სფეისების გარეშე'),
        ]),
      password: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)]),
      confirmPassword: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)])
    });
  }
}
