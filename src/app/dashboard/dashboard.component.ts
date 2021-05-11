import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { CollapsibleCardComponent } from '../shared/components/collapsible-card/collapsible-card.component';

@Component({
    selector: 'app-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    @Input() open: boolean;
    @ViewChild(MatTabGroup) accountTabs: MatTabGroup;
    @ViewChild(CollapsibleCardComponent)
    collapsibleCard: CollapsibleCardComponent;
    showFiller = false;

    constructor() {}

    ngOnInit(): void {}
}
