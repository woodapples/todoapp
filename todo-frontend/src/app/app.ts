import { Component } from '@angular/core';
import { TodoPage } from './todo-page/todo-page';

@Component({
  selector: 'app-root',
  imports: [TodoPage],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'Awsome Todo App';
}
