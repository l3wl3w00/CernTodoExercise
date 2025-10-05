import {Injectable} from "@angular/core";
import {Todo} from "./todo.service";

@Injectable({
  providedIn: 'root'
})
export class TodoClient {
  getFiltered(match: string): Promise<Todo[]> {
    return fetch('/api/todos?filter=' + match, {method: 'GET'}).then(response => response.json() as Promise<Todo[]>)
  }
  
  remove(id: number): Promise<any> {
    return fetch('/api/todos/' + id, {method: 'DELETE'})
  }
}