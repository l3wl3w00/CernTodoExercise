import {ChangeDetectorRef, Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
      <div class="title">
          <h1>
              A list of TODOs
          </h1>
      </div>
      <div class="list">
          <label for="search">Search...</label>
          <input [(ngModel)]="searchInput" id="search" type="text">
          <app-progress-bar *ngIf="loading"></app-progress-bar>
          <ng-container *ngIf="loaded">
              <app-todo-item *ngFor="let todo of todos$ | async"
                             (click)="onTodoClicked(todo.id)"
                             [item]="todo"></app-todo-item>
          </ng-container>
          <div id="errorDiv" *ngIf="errored">
              Failed to load todos.
              <button (click)="reload()">Retry</button>
          </div>
      </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  private readonly _todos$ = new BehaviorSubject<Todo[] | 'loading' | 'errored'>('loading');
  readonly todos$ = this._todos$.asObservable() as Observable<Todo[]>;
  
  private _searchInput = '';
  
  constructor(private readonly todoService: TodoService) {
    this.load();
  }
  
  get searchInput() {
    return this._searchInput;
  }
  set searchInput(value: string) {
    this._searchInput = value;
    this.reload();
  }
  
  get errored() {
    return this._todos$.getValue() === 'errored'
  }
  
  get loading() {
    return this._todos$.getValue() === 'loading';
  }
  
  get loaded() {
    return !this.errored && !this.loading;
  }
  
  load() {
    this.todoService.getFiltered(this.searchInput)
      .subscribe({
        next: todos => this._todos$.next(todos),
        error: err => this._todos$.error(err),
      });
  }
  
  reload() {
    this._todos$.next('loading');
    this.load();
  }
  
  onTodoClicked(id: number) {
    this.todoService.remove(id).subscribe({
      next: _ => this.reload(),
      error: _ => this._todos$.next('errored'),
    })
  }
}
