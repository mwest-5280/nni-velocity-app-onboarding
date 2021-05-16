import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerComponent } from './consumer.component';
import { MaterialModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'src/app/shared/components/divider';
import { StateCountryEventService } from 'src/app/services/state-country-event.service';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ConsumerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    NgxMaskModule
  ],
  providers: [StateCountryEventService],
  exports: [ConsumerComponent]
})
export class ConsumerModule { }
