import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BGValidators} from '../../../../shared/validators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ClientService} from '../../../../shared/identify/client.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit, OnDestroy {
  addClientForm: FormGroup;
  newClientSub: Subscription;
  error;

  constructor(private http: HttpClient,
              private clientService: ClientService,
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
    this.newClientSub = this.clientService.addClient(firstName, lastName, plusPoints).subscribe(
      (resp) => {
        this.addClientForm.reset();
        this.clientService.clientInfo = resp;
        this.clientService.isIdentified = true;
        this.router.navigate(['/krn/krnicp']);
      }, (error) => {
        this.error = error;
      }
    );
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

  ngOnDestroy() {
    this.newClientSub?.unsubscribe();
  }
}
