import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderModule } from '../shared/header/header.module';
import { MaterialModule } from '../shared';
import { ConsumerModule } from './consumer';
import { EducationModule } from './education/education.module';
import { CollapsibleCardModule } from '../shared/components/collapsible-card/collapsible-card.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HeaderModule,
        MaterialModule,
        ConsumerModule,
        EducationModule,
        CollapsibleCardModule
    ],
    exports: [DashboardComponent]
})
export class DashboardModule {}
