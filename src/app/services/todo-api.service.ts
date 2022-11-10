import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoDto } from '../models/todo-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private _baseUrl = `${environment.host}/todos`;

  constructor(private _http: HttpClient) { }

  getList(): Observable<TodoDto[]> {
    return this._http.get<TodoDto[]>(this._baseUrl)
      .pipe(delay(2000));
  }

  getItem(id: number): Observable<TodoDto> {
    return this._http.get<TodoDto>(`${this._baseUrl}/${id}`);
  }
}
