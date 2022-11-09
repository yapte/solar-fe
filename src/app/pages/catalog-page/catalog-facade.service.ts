import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoRepoService } from 'src/app/services/todo-repo.service';

@Injectable({ providedIn: 'root' })
export class CatalogFacadeService {
    private _data$ = new BehaviorSubject<Todo[]>(null);
    data$: Observable<Todo[]> = this._data$.asObservable();

    private _inProgress$ = new BehaviorSubject<boolean>(false);
    inProgress$: Observable<boolean> = this._inProgress$.asObservable();

    private _error$ = new BehaviorSubject<string>(null);
    error$: Observable<string> = this._error$.asObservable();

    constructor(private _todoRepo: TodoRepoService) { }

    fetch(): void {
        this._inProgress$.next(true);
        this._todoRepo.list()
            .subscribe({
                next: items => {
                    this._data$.next(items);
                    this._inProgress$.next(false);
                }, 
                error: error => {
                    this._inProgress$.next(false);
                    this._error$.next(':(')
                },
            });
    }
}