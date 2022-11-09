import { Component, OnInit } from '@angular/core';
import { pageAnimation } from 'src/app/animations/page.animation';
import { Todo } from 'src/app/models/todo';
import { CatalogFacadeService } from './catalog-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
  animations: [pageAnimation],
})
export class CatalogPageComponent implements OnInit {
  // todos: Todo[];
  todos$: Observable<Todo[]> = this._facade.data$;
  inProgress$: Observable<boolean> = this._facade.inProgress$;
  error$: Observable<string> = this._facade.error$;

  constructor(private _facade: CatalogFacadeService) { }

  ngOnInit(): void {
    this._facade.fetch();

    
  }

}
