import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, take, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { ApiService, TimerService, ConnectionService, WINDOW } from 'my-data';
import { TimerStatus } from 'projects/my-data/src/lib/enums';
import { ModalService } from './modules/modal/services/modal.service';
import { ModalBoxComponent } from './modules/modal/components';

type ModalStatus = 'hidden' | 'visible';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  protected unsubscribe$ = new Subject();
  public loading = false;
  public todos: any[];
  private modalStatus: ModalStatus = 'hidden';

  constructor(
    private apiService: ApiService,
    private timerService: TimerService,
    @Inject(WINDOW) private globalWindow,
    private modalService: ModalService,
    protected readonly translateService: TranslateService,
    protected readonly connectionService: ConnectionService
  ) {
    translateService.setDefaultLang('en-US');
    this.timerService.start();

    this.globalWindow.addEventListener('click', () => {
      this.timerService.currentStatus$
        .pipe(
          take(1),
          filter(status => status !== TimerStatus.Expired)
        )
        .subscribe(() => {
          this.timerService.restart();
        });
    });

    this.connectionService
      .monitor()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isConnected => {
        if (isConnected && this.modalStatus === 'visible') {
          this.removeModal();
          return;
        }

        if (isConnected || (!isConnected && this.modalStatus === 'visible')) {
          return;
        }

        this.showModal();
      });
  }

  get remainingTime$(): Observable<any> {
    return this.timerService.remainingTime$;
  }

  get timerStatus$(): Observable<TimerStatus> {
    return this.timerService.currentStatus$;
  }

  async ngOnInit() {
    this.loading = true;
    await this.apiService.getTodos();
    this.loading = false;

    this.apiService.todos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(todos => (this.todos = todos));
  }

  public removeModal(): void {
    this.modalService.destroy();
    this.modalStatus = 'hidden';
  }

  public showModal(): void {
    this.modalService.init(ModalBoxComponent, { message: 'Network is disconnected!' }, {});
    this.modalStatus = 'visible';
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.connectionService.destroy();
  }
}
