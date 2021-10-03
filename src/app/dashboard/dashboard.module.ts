import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderModule } from '../shared/header/header.module';
import { MaterialModule } from '../shared';
import { ConsumerModule } from './consumer';
import { EducationModule } from './education/education.module';
import { CollapsibleCardModule } from '../shared/components/collapsible-card/collapsible-card.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DividerModule } from '../shared/components/divider';
import { IncomeshareModule } from './incomeshare/incomeshare.module';
import { DocumentUploadModule } from './document-upload/document-upload.module';
@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HeaderModule,
        MaterialModule,
        CollapsibleCardModule,
        ConsumerModule,
        EducationModule,
        MatSidenavModule,
        DividerModule,
        IncomeshareModule,
        DocumentUploadModule
    ],
    exports: [DashboardComponent]
})
export class DashboardModule {}
