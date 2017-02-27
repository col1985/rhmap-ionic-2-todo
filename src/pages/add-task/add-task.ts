import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html'
})

export class AddTaskPage {

  private title: string;
  private description: string;
  private completeOn: Date;
  private setReminder: boolean;

  constructor(
    private navCtrl: NavController,
    private view: ViewController,
    private navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

  saveTask() {
    let newTask: Todo = {
      id: Math.floor(Math.random()),
      title: this.title,
      created: new Date(),
      description: this.description,
      completeOn: new Date(this.completeOn),
      completed: false,
      setReminder: this.setReminder
    };

    this.view.dismiss(newTask);
  }

  close() {
    this.view.dismiss();
  }
}
