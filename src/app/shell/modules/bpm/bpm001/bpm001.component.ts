import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {BGValidators} from '../../../../shared/validators';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {
  addClientForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  regClient() {
    if (this.addClientForm.invalid) {
      return;
    }
    console.log('asdasdasd');
    console.log(this.get('firstName').value, this.get('lastName').value, this.get('plusPoints').value);
  }

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
