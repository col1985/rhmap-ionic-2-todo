import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddTaskPage } from '../pages/add-task/add-task';
import { TaskDetailPage } from '../pages/task-detail/task-detail';

import { TodoService } from './../providers/todo.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddTaskPage,
    TaskDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddTaskPage,
    TaskDetailPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: TodoService, useClass: TodoService }
  ]
})
export class AppModule { }
