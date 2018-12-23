import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from 'my-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  protected unsubscribe$ = new Subject<void>();
  public loading = false;
  public todos: any[];

  constructor(
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.apiService.getTodos();
    this.loading = false;

    this.apiService.todos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(c => (this.todos = c));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
