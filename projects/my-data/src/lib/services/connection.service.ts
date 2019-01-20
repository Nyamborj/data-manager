import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { WindowRef } from './window-ref.service';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private isConnected$ = new BehaviorSubject<boolean>(true);
  private interval: any;

  constructor(private windowRef: WindowRef) {
    if (!this.windowRef.nativeWindow.navigator) {
      this.windowRef.nativeWindow.addEventListener('online', () => this.isConnected$.next(true));
      this.windowRef.nativeWindow.addEventListener('offline', () => this.isConnected$.next(false));
    } else {
      this.interval = setInterval(() => {
        const isConnected = this.windowRef.nativeWindow.navigator.onLine ? true : false;

        this.isConnected$.next(isConnected);
      }, environment.networkCheckFrequency);
    }
  }

  public monitor(): Observable<boolean> {
    return this.isConnected$.asObservable();
  }

  public destroy(): void {
    clearInterval(this.interval);
  }
}
