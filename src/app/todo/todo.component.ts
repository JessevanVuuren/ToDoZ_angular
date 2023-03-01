import { Component, Input, OnInit } from '@angular/core';
import { ToDo } from 'src/models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input("todo") todo!: ToDo
  @Input("index") index!: number
  priorityColor = ""

  ngOnInit(): void {
    switch (this.todo.attributes.priority) {
      case "low":
        this.priorityColor = "#14F06F"
        break;
      case "medium":
        this.priorityColor = "#F0A727"
        break;
      case "high":
        this.priorityColor = "#E60158"
        break;
    }
  }
}
