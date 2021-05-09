import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { MessageModule } from '../shared/message/message.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoaderModule } from '../shared/components/loader/loader.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        MessageModule,
        LoaderModule
    ],
    exports: [LoginComponent]
})
export class LoginModule {}
