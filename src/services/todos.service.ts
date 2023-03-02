import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToDo } from "src/models/Todo";


@Injectable({ providedIn: 'root' })
export class TodosService {

  public todosSubject = new BehaviorSubject<ToDo[]>([])

  constructor(private http: HttpService) { }

  getTodos() {
    this.http.getData<ToDo>("/api/tasks").subscribe((todos) => {
      this.todosSubject.next(todos)
    })
  }

  sendToDo(todo:FormData) {
    return this.http.sendData("/api/tasks", todo)
  }

}
