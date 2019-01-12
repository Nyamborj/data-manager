import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../environments';
import { TimerStatus } from '../enums/index';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeLeft = environment.idleTimeout;
  private status = TimerStatus.Stopped;
  private interval: any;
  private remainingTimeSubject$ = new BehaviorSubject<number>(this.timeLeft);
  private currentStatusSubject$ = new BehaviorSubject<TimerStatus>(this.status);

  get remainingTime$(): Observable<number> {
    return this.remainingTimeSubject$.asObservable();
  }

  get currentStatus$(): Observable<TimerStatus> {
    return this.currentStatusSubject$.asObservable();
  }

  public start(): void {
    if (this.status === TimerStatus.Running) {
      return;
    }

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

        this._updateStatus(TimerStatus.Running, this.timeLeft);
      } else {
        this.stop();

        this._updateStatus(TimerStatus.Expired, this.timeLeft);
      }
    }, 1000);
  }

  public restart(): void {
    this.stop();
    this.start();

    this._updateStatus(TimerStatus.Running, this.timeLeft);
  }

  public pause(): void {
    if (this.status === TimerStatus.Running) {
      clearInterval(this.interval);

      this._updateStatus(TimerStatus.Paused, this.timeLeft);
    }
  }

  public stop(): void {
    this.timeLeft = environment.idleTimeout;

    clearInterval(this.interval);

    this._updateStatus(TimerStatus.Stopped, this.timeLeft);
  }

  private _updateStatus(status: TimerStatus, timeLeft: number): void {
    this.status = status;
    this.currentStatusSubject$.next(status);
    this.remainingTimeSubject$.next(timeLeft);
  }
}
