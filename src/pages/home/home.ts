import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TodoService } from './../../providers/todo.service';
import { Todo } from './../../models/Todo';

import { AddTaskPage } from '../add-task/add-task';
import { TaskDetailPage } from '../task-detail/task-detail';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public list: Todo[];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private todoService: TodoService
  ) { }

  ionViewDidLoad() {
    this._getTodos();
  }

  ionViewWillLeave() {
    console.log("Leaving Home");
  }

  private _getTodos() {
    this.todoService.getList().then(items => this.list = items);
  }

  addTask(): void {
    let addModal = this.modalCtrl.create(AddTaskPage);

    addModal.onDidDismiss((task) => {
      if (task) {
        this.saveTask(task);
      }
    });
    addModal.present();
  }

  saveTask(task: Todo): void {
    this.todoService
      .addItem(task)
      .then((success) => {
        if (success) {
          // get updated list
          this._getTodos();
        }
      })
  }

  deleteTask($index): void {
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

  completeTask(task: Todo): void {
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

  viewTaskDetail($index: number, task: Todo): void {
    let params = {
      index: $index,
      task: task
    };
    this.navCtrl.push(TaskDetailPage, params);
  }
}
