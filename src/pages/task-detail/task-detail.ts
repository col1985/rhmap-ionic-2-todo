import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})

export class TaskDetailPage {

  id: number;
  title: string;
  description: string;
  completed: boolean;
  completedOn: Date;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('task').id;
    this.title = this.navParams.get('task').title;
    this.description = this.navParams.get('task').description;
    this.completed = this.navParams.get('task').completed;
    this.completedOn = this.navParams.get('task').completedOn;
  }

  ionViewWillLeave() {
    console.log("Task detail will leave");
  }

  completeTask() {
    this.completed = true
  }
}
