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
            // console.info('fhinit successful', this.host)
        })
    }

    getList(): Promise<Todo[]> {
        // console.log(this.TodoList)
        return new Promise((resolve, reject) => {
            resolve(this._TodoList)
        })
    }

    addItem(task: Todo): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // add to list array
            // this.cloud({
            //     'method': 'GET',
            //     'path': '/ping'
            // }).then((res) => console.info('ping: ', res))
            //     .catch((err) => console.error(err))

            this.cloud()
                .subscribe(
                (res) => console.info('ping', res),
                (err) => console.error(err)
                )

            if (this._TodoList.indexOf(task) === -1) {
                this._TodoList.push(task)
                resolve(true)
            }
        })
    }

    deleteItem(index: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // if (!index) { reject(false) }
            // remove from array
            this._TodoList.splice(index, 1)
            resolve(true)
        })
    }

    updateItem(task: Todo): Promise<boolean> {
        return new Promise((resolve, reject) => {
            for (var i in this._TodoList) {
                if (this._TodoList[i].id === task.id) {
                    this._TodoList[i] = task
                    resolve(true)
                } else {
                    reject(false)
                }
            }
        })
    }

    // ** promise wrapped fh cloud call 
    // cloud(opts: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this._fh.cloud(opts,
    //             (res) => resolve(res),
    //             (msg, err) => reject(err))
    //     })
    // }

    // ** promise wrapped fh cloud call 
    cloud(): Observable<any> {
        let headers = new Headers(this._fh.getFHHeaders());
        let opts = new RequestOptions({ headers: headers });
        let url = this._host + '/ping';
        return this._http
            .get(url, opts)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }

    // private _getHeaders(): {} {
    //     return this.fh.getFHHeaders()
    // }

    // private _setHeaders(): void {

    // }

    // private _handleResponse() { }



    //     public getFHParams(): Promise < any > {
    //     let params = this.fh.getFHParams()
    //         return new Promise((resolve, reject) => { resolve(params) })
    // }

    // public pingTest(): Observable<any> {
    //     let headers = new Headers(this._getHeaders());
    //     // console.log(headers)
    //     let options = new RequestOptions({ headers: headers });
    //     console.log(options)
    //     return this._http.get(this.host, options).map((res: Response) => res.json())
    // }
}