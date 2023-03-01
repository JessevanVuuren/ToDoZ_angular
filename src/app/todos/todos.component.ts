import { Component, OnInit } from '@angular/core';
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

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getTodos()

    this.todosService.todosSubject.subscribe(todos => {
      this.todos = todos
    })
  }


}
