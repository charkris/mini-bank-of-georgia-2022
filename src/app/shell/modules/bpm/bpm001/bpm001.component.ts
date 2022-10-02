import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {BGValidators} from '../../../../shared/validators';
import {AddClientService} from './add-client.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {
  addClientForm: FormGroup;
  error;

  constructor(private http: HttpClient,
              private addClientService: AddClientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  regClient() {
    if (this.addClientForm.invalid) {
      return;
    }
    const firstName = this.get('firstName').value;
    const lastName = this.get('lastName').value;
    const plusPoints = this.get('plusPoints').value;
    console.log(firstName, lastName, plusPoints);
    this.addClientService.addClient(firstName, lastName, plusPoints).subscribe(
      (resp) => {
        // console.log(resp);
        this.addClientForm.reset();
        this.router.navigate(['krn/krnicp']);
        // this.router.navigate()
      }, (error) => {
        this.error = error;
      }
    );
  }

//
//   this.authService.registerUser(fullName, userName, password).subscribe(
// (resData) => {
//   console.log(resData);
//   this.registerForm.reset();
//   this.router.navigate(['/bpm/bpm000']);
// }, (error) => {
//   this.error = error;
// }
// );

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors) : [];
  }

  get(controlName) {
    return this.addClientForm.get(controlName);
  }

  initForm() {
    this.addClientForm = new FormGroup({
      firstName: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)]),
      lastName: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)]),
      plusPoints: new FormControl(undefined,
        [BGValidators.required], BGValidators.positiveNumbers),
    });
  }

}
