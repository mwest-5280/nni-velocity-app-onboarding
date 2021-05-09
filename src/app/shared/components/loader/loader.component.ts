import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';
import { LoaderState } from '../../../models/loader';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService, private changeDetector: ChangeDetectorRef) {}
  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
      this.changeDetector.detectChanges();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
