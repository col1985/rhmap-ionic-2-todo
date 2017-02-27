import * as _ from 'lodash';
import $fh from 'fh-js-sdk';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Todo } from './../models/Todo';
import { TODOS } from './../models/mock-data';

@Injectable()
export class TodoService {
    private _host: string;
    private _fh: any;
    private _TodoList: Todo[]

    constructor(private _http: Http) {

        this._fh = $fh
        this._TodoList = TODOS

        // get cloud host
        this._fh.on('fhinit', (err, handShake) => {
            if (err) { console.error('fhinit', err) }
            this._host = handShake
        })
    }

    public getList(): Promise<Todo[]> {
        // console.log(this.TodoList)
        return new Promise((resolve, reject) => {
            resolve(this._TodoList)
        })
    }

    public addItem(task: Todo): Promise<boolean> {
        return new Promise((resolve) => {

            // add to list array
            // this.cloud({
            //     'method': 'GET',
            //     'path': '/ping'
            // }).then((res) => console.info('ping: ', res))
            //     .catch((err) => console.error(err))

            let index = _.findIndex(this._TodoList, _.pick(task, 'id'));
            if (index === -1) {
                this._TodoList.push(task)
                resolve(true)
            }
        })
    }

    public deleteItem(index: number): Promise<boolean> {
        return new Promise((resolve) => {
            // remove from array
            this._TodoList.splice(index, 1)
            resolve(true)
        })
    }

    public updateItem(task: Todo): Promise<boolean> {
        return new Promise((resolve) => {
            // get object id
            let index = _.findIndex(this._TodoList, _.pick(task, 'id'));
            // update array
            this._TodoList.splice(index, 1, task)
            resolve(true);
        });
    }

    // ** promise wrapped fh cloud call 
    public cloud(opts: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._fh.cloud(opts,
                (res) => resolve(res),
                (msg, err) => reject(err))
        });
    }

    // ** Observable http call 
    // public cloud(): Observable<any> {
    //     let headers = new Headers(this._fh.getFHHeaders());
    //     let opts = new RequestOptions({ headers: headers });
    //     let url = this._host + '/ping';
    //     return this._http
    //         .get(url, opts)
    //         .map((res: Response) => res)
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    // }
}