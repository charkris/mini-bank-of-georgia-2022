import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClientHeaderComponent} from './client-header.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ClientHeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [ClientHeaderComponent],
})

export class ClientHeaderModule {

}
