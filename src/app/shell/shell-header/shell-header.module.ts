import {NgModule} from '@angular/core';
import {ShellHeaderComponent} from './shell-header.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ShellHeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [ShellHeaderComponent]

})

export class ShellHeaderModule{

}
