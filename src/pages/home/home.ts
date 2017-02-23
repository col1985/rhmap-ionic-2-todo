import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { TodoService } from './../../providers/todo.service';

import 'rxjs/add/operator/map';

// console.log(API)

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // private api
  private headers

  constructor(
    public todoService: TodoService
  ) {
    setTimeout(() => {
      this.todoService.pingTest()
        .then(res => console.info(res))
        .catch((err) => console.error(err))
    }, 1500)

  }

  test(): void {

  }
}
