import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadComponent } from './document-upload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DividerModule } from 'src/app/shared/components/divider';
import { MaterialModule } from 'src/app/shared';

@NgModule({
  declarations: [DocumentUploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    MaterialModule
  ],
  exports: [
    DocumentUploadComponent
  ]
})
export class DocumentUploadModule { }
