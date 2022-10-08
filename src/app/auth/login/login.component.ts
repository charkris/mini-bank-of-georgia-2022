import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/auth/auth.service';
import {BGValidators} from '../../shared/validators';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onLogin() {
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    }
    const username = this.get('userName').value;
    const password = this.get('password').value;
    this.authService.login(username, password).subscribe(
      (resData) => {
        // console.log(resData);
        this.router.navigate(['/bpm/bpm000']);
        this.loginForm.reset();
      }
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
