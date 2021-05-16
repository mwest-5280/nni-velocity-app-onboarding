import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface State {
  name: string;
  abbreviation: string;
}

export interface Country {
  name: string;
  code: string;
}

export interface QuasarEvents {
  service: string;
  eventName: string;
}

@Injectable()
export class StateCountryEventService {
  countries$ = this.loadCountries().pipe(shareReplay(1));
  usaOnly$ = of([{ name: 'United States', code: 'USA' }]).pipe(shareReplay(1));
  states$ = this.loadStates().pipe(shareReplay(1));
  quasarEvents$ = this.loadQuasarEvents().pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  private loadStates(): Observable<State[]> {
    return this.http.get<State[]>('../../../../api/states.json');
  }

  private loadCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('./api/countries.json');
  }

  private loadQuasarEvents(): Observable<any[]> {
    return this.http.get<QuasarEvents[]>('./api/events.json');
  }
}
