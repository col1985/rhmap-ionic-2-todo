import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html'
})

export class AddTaskPage {

  title: string;
  description: string;
  completeOn: Date;

  constructor(
    public navCtrl: NavController,
    public view: ViewController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

  saveTask() {
    let newTask: Todo = {
      id: Math.random(),
      title: this.title,
      created: new Date(),
      description: this.description,
      completeOn: this.completeOn,
      completed: false
    };

    this.view.dismiss(newTask);
  }

  close() {
    this.view.dismiss();
  }
}
