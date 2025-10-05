import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {BehaviorSubject} from "rxjs";

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
          <app-progress-bar *ngIf="!loaded"></app-progress-bar>
          <app-todo-item *ngFor="let todo of todos$ | async" [item]="todo"></app-todo-item>
      </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  readonly todos$ = new BehaviorSubject<Todo[] | null>(null); // null represents loading state
  private _searchInput = '';
  
  constructor(private readonly todoService: TodoService) {
    this.load();
  }
  
  get searchInput() {
    return this._searchInput;
  }
  set searchInput(value: string) {
    this._searchInput = value;
    this.todos$.next(null);
    this.load();
  }
  
  get loaded() {
    return this.todos$.getValue() !== null;
  }
  
  load() {
    this.todoService.getFiltered(this.searchInput)
      .subscribe({
        next: todos => this.todos$.next(todos),
        error: err => this.todos$.error(err),
      });
  }
}
