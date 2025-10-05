import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {TodoClient} from "./todo.client";
import {fromPromise} from "rxjs/internal-compatibility";

export interface Todo {
  id: number;
  task: string;
  priority: 1 | 2 | 3;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  constructor(private readonly todoClient: TodoClient) { }
  
  getFiltered(match: string): Observable<Todo[]> {
    return fromPromise(this.todoClient.getFiltered(match))
  }

  remove(id: number): Observable<void> {
    return fromPromise(this.todoClient.remove(id))
  }
}
