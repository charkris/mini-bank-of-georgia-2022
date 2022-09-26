import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onInput(inp) {
    console.log((inp.target as HTMLInputElement).value);

  }
  goToRegister() {
    console.log('register');
    //console.log(this.activeRoute)
    this.router.navigate(['/register']);
    console.log(this.route.snapshot)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
