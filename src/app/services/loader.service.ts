import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../models/loader';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoaderManually = false;
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() {}
  show() {
    this.loaderSubject.next({ show: true } as LoaderState);
    this.showLoaderManually = true;
  }
  hide() {
    this.loaderSubject.next({ show: false } as LoaderState);
    this.showLoaderManually = false;
  }
}
