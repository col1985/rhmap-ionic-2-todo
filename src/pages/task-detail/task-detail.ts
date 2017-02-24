import { Component } from '@angular/core';
import { Todo } from './../../models/todo';
import { TodoService } from './../../providers/todo.service';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})

export class TaskDetailPage {

  id: number;
  index: number;
  title: string;
  description: string;
  completed: boolean;
  created: Date;
  completeOn: Date;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private todoService: TodoService
  ) { }

  ionViewDidLoad() {
    console.dir('params: ', this.navParams)
    this.index = this.navParams.get('index').index;
    this.id = this.navParams.get('task').id;
    this.title = this.navParams.get('task').title;
    this.created = this.navParams.get('task').created;
    this.description = this.navParams.get('task').description;
    this.completed = this.navParams.get('task').completed;
    this.completeOn = this.navParams.get('task').completeOn;
  }

  ionViewWillLeave() {
    console.log("Task detail will leave");
  }

  completeTask() {
    let updatedTask: Todo = {
      id: this.id,
      title: this.title,
      created: this.created,
      description: this.description,
      completed: true,
      completeOn: this.completeOn
    }

    this.todoService
      .updateItem(updatedTask)
      .then((success) => {
        console.info('Updated Item', success)
        this.navCtrl.pop()
      })
      .catch((err) => console.error(err))
  }

  deleteTask() {
    this.todoService
      .deleteItem(this.index)
      .then((success) => {
        console.info('delete Item', success)
        this.navCtrl.pop()
      })
      .catch((err) => console.error(err))
  }
}
