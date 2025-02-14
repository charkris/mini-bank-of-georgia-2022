import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/auth/auth.service';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Levan';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }

}
