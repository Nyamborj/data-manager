import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataManagerService } from '../data/data-manager.service';
import { DataNames } from '../enums/data-names.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public todos$: Observable<any>;

  constructor(
    protected http: HttpClient,
    protected dataService: DataManagerService
  ) {}

  public async getTodos(): Promise<void> {
    const todos = await this.http.get('https://jsonplaceholder.typicode.com/todos')
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return of(null);
      })
    )
    .toPromise();

    this.dataService.upsertData(DataNames.Todos, todos);
    this.todos$ = this.dataService.getData(DataNames.Todos);
  }
}
