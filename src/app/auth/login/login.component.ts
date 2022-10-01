import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {logger} from 'codelyzer/util/logger';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router) {
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
    console.log(username, password);
  }

  onInput(inp) {
    // console.log((inp.target as HTMLInputElement).value);
    // console.log(this.loginForm.get('userName'));
    // console.log('same', this.get('userName'));
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  get(controlName) {
    return this.loginForm.get(controlName);
  }

  initForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl(undefined,
        [Validators.required,
                      Validators.pattern(/^\S*$/, 'მომხმარებლის სახელი არ უნდა შეიცავდეს სფეისებს'),
                      Validators.minLength(2),
                      Validators.maxLength(30),
        ]),
      password: new FormControl(undefined,
        [Validators.required,
                      Validators.minLength(2),
                      Validators.maxLength(30),])
    });
  }

}
