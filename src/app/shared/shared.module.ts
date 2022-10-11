import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoaderComponent} from './loader/loader.component';
import {AlertErrorComponent} from './alert-error/alert-error.component';
import {PopupDirective} from '../shell/shell-header/popup.directive';
import {FloatnumPipe} from './floatnum.pipe';

@NgModule({
  declarations: [LoaderComponent, AlertErrorComponent, PopupDirective, FloatnumPipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, LoaderComponent, AlertErrorComponent, PopupDirective, FloatnumPipe],
})

export class SharedModule {

}
