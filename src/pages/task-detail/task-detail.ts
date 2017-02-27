import { Component } from '@angular/core';
import { Todo } from './../../models/todo';
import { TodoService } from './../../providers/todo.service';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})

export class TaskDetailPage {

  private id: number;
  private index: number;
  private title: string;
  private description: string;
  private completed: boolean;
  private setReminder: boolean;
  private created: Date;
  private completeOn: Date;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private todoService: TodoService
  ) { }

  ionViewDidLoad() {
    // load task details
    this._getViewData()
  }

  ionViewWillLeave() {
    console.log("Task detail will leave");
  }

  private _getViewData(): void {
    this.index = this.navParams.get('index').index;
    this.id = this.navParams.get('task').id;
    this.title = this.navParams.get('task').title;
    this.created = this.navParams.get('task').created;
    this.description = this.navParams.get('task').description;
    this.completed = this.navParams.get('task').completed;
    this.completeOn = this.navParams.get('task').completeOn;
    this.setReminder = this.navParams.get('task').setReminder;
  }

  completeTask(): void {
    let updatedTask: Todo = {
      id: this.id,
      title: this.title,
      created: this.created,
      description: this.description,
      completed: true,
      setReminder: this.setReminder,
      completeOn: this.completeOn
    }

    this.todoService
      .updateItem(updatedTask)
      .then((success) => this.navCtrl.pop())
      .catch((err) => console.error(err))
  }

  deleteTask(): void {
    this.todoService
      .deleteItem(this.index)
      .then((success) => this.navCtrl.pop())
      .catch((err) => console.error(err))
  }
}
