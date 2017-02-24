import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TodoService } from './../../providers/todo.service';
// import { TODOS } from './../../models/mock-data';
import { Todo } from './../../models/Todo';

import { AddTaskPage } from '../add-task/add-task';
import { TaskDetailPage } from '../task-detail/task-detail';

import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public list: Todo[];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private todoService: TodoService
  ) { }

  test(): void { }

  private _getTodos() {
    this.todoService.getList().then(items => this.list = items);
  }

  ionViewDidLoad() {
    this._getTodos();
  }

  ionViewWillLeave() {
    console.log("Leaving Home");
  }

  addTask() {
    let addModal = this.modalCtrl.create(AddTaskPage);

    addModal.onDidDismiss((task) => {
      if (task) {
        this.saveTask(task);
      }
    });

    addModal.present();
  }

  saveTask(task: Todo) {
    this.todoService
      .addItem(task)
      .then((success) => {
        if (success) {
          // get updated list
          this._getTodos();
        }
      })
  }

  deleteTask($index) {
    console.log($index)
    // delete via service
    this.todoService
      .deleteItem($index)
      .then((success) => {
        if (success) {
          // get updated list
          this._getTodos();
        }
      })
  }

  completeTask(task: Todo) {
    task.completed = true

    // update via service
    this.todoService
      .updateItem(task)
      .then((success) => {
        if (success) {
          // get updated list
          this._getTodos();
        }
      })
  }

  viewTaskDetail(task: Todo): void {
    this.navCtrl.push(TaskDetailPage, {
      task: task
    });
  }
}
