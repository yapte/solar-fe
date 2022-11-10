import { Injectable } from '@angular/core';
import { TodoApiService } from './todo-api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoRepoService {
  private _listCache$ = new BehaviorSubject<Todo[]>(null);
  constructor(private _todoApi: TodoApiService) { }

  list(): Observable<Todo[]> {
    if (this._listCache$.value) {
      return of(this._listCache$.value);
    }

    return this._todoApi.getList()
      .pipe(
        map(dtos => dtos.map(dto => new Todo(dto))),
        tap(todos => {
          this._listCache$.next(todos);
        })
      );
  }
}


// 1. Mapping
// 2. Cache
// 3. Catch & handle error

// ERRORS 400+ => message from errorObject
// ERRORS 500+, 200 parseError => Try later