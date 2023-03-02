import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToDo } from 'src/models/Todo';
import { TodosService } from 'src/services/todos.service';
import { init_animation } from '../animations/animation';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [...init_animation(2000, 2000, 100, ["fade_logo", "fade_input", "todos"])],
})
export class TodosComponent implements OnInit {
  todo = new FormControl('');
  todos: ToDo[] = []
  state = 'init'
  
  errorCode = ""
  redLine = false

  timer?:ReturnType<typeof setTimeout>

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getTodos()

    this.todosService.todosSubject.subscribe(todos => {
      this.todos = todos.reverse()
    })
  }

  addToDo() {
    this.redLine = false

    const todo = this.todo.value

    if (!todo) {
      this.redLine = true
      this.dynamicTimer()
      return
    }
    const form_data = new FormData()
    form_data.append("name", todo)
    form_data.append("description", "lets goo")
    form_data.append("priority", "medium")

    this.todosService.sendToDo(form_data).subscribe(data => {
      console.log(data)
      this.todosService.getTodos()
    })
    this.todo.setValue("")
  }


  dynamicTimer() {
    clearInterval(this.timer)
    this.timer = setTimeout(() => this.redLine = false, 400)
  }
}
