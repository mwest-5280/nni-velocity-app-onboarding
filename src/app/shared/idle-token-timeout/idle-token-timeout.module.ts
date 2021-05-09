import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleAndTokenWarningModalComponent } from './idle-token-warning-modal/idle-token-warning-modal.component';
import { IdleTokenTimeoutComponent } from './idle-token-timeout.component';
import { MaterialModule } from '../material.module';
import { IdleTokenService } from './idle-token.service';

@NgModule({
  declarations: [IdleAndTokenWarningModalComponent, IdleTokenTimeoutComponent],
  imports: [CommonModule, MaterialModule],
  providers: [IdleTokenService],
  exports: [IdleAndTokenWarningModalComponent, IdleTokenTimeoutComponent]
})
export class IdleTokenTimeoutModule {}
