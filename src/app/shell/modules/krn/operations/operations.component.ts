import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoaderService} from '../../../../shared/loader/loader.service';

@Component({
  selector: 'bg-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  constructor(private router: Router, private loader: LoaderService) {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.router.navigate(['/pmd/pmd311']);
  }

}
