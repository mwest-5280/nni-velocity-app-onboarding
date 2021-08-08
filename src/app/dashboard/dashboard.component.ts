import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
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
    public username: string;
    formName: string;
    constructor(private router: Router, public authService: AuthenticationService) {
        this.username = this.authService.getUsername();
    }

    ngOnInit(): void {
        this.tabChanged();
    }
    logout() {
        this.authService.logout();
    }

    tabChanged(tabChangeEvent?: MatTabChangeEvent): void {
        if (tabChangeEvent === undefined) {
            this.formName = 'Consumer Bundle';
        } else {
            this.formName = tabChangeEvent.tab.textLabel;
        }
    }

    changePassword(): void {
        this.router.navigate(['password']);
    }
}
