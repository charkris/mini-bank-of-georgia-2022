import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/auth/auth.service';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Levan';
  error;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.loggedError.subscribe((err) => {
      this.error = err;
    });
  }

  onCloseModal() {
    this.error = undefined;
  }

}
