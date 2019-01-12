import { TestBed, inject } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { TimerService } from './timer.service';
import { TimerStatus } from '../enums/index';
import { environment } from '../environments/environment';

describe('TimerService', () => {
  let timerService: TimerService;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerService]
    });

    timerService = new TimerService();
    jasmine.clock().uninstall();
  });

  afterEach(() => {
    jasmine.clock().uninstall();

    if (subscription) {
      subscription.unsubscribe();
    }
  });

  it('should be created', inject([TimerService], (service: TimerService) => {
    expect(service).toBeTruthy();
  }));

  it('should start timer', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(5000);

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Running);
      expect(remainingTime).toEqual(environment.idleTimeout - 5);

      done();
    });
  });

  it('should pause timer', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(7000);
    timerService.pause();

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Paused);
      expect(remainingTime).toEqual(environment.idleTimeout - 7);

      done();
    });
  });

  it('should restart timer when running', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(3000);
    timerService.restart();

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Running);
      expect(remainingTime).toEqual(environment.idleTimeout);

      done();
    });
  });

  it('should restart timer when paused', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(4000);
    timerService.pause();
    jasmine.clock().tick(5000);
    timerService.restart();

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Running);
      expect(remainingTime).toEqual(environment.idleTimeout);

      done();
    });
  });

  it('should restart timer when stopped', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(8000);
    timerService.stop();
    jasmine.clock().tick(5000);
    timerService.restart();

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Running);
      expect(remainingTime).toEqual(environment.idleTimeout);

      done();
    });
  });

  it('should stop timer when running', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(6000);
    timerService.stop();
    jasmine.clock().tick(5000);

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Stopped);
      expect(remainingTime).toEqual(environment.idleTimeout);

      done();
    });
  });

  it('should stop timer when paused', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(6000);
    timerService.pause();
    jasmine.clock().tick(5000);
    timerService.stop();

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Stopped);
      expect(remainingTime).toEqual(environment.idleTimeout);

      done();
    });
  });

  it('should NOT start timer when running', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(5000);
    timerService.start();

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Running);
      expect(remainingTime).toEqual(environment.idleTimeout - 5);

      done();
    });
  });

  it('should NOT pause timer when stopped', (done) => {
    jasmine.clock().install();
    timerService.start();
    jasmine.clock().tick(4000);
    timerService.stop();
    jasmine.clock().tick(1000);
    timerService.pause();

    subscription = timerService.currentStatus$.pipe(
      withLatestFrom(timerService.remainingTime$),
    ).subscribe(([status, remainingTime]) => {
      expect(status).toEqual(TimerStatus.Stopped);
      expect(remainingTime).toEqual(environment.idleTimeout);

      done();
    });
  });
});
