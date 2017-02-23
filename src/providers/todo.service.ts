import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Todo } from './../models/Todo';

import $fh from 'fh-js-sdk';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class TodoService {
    private host: string = ""
    private fh


    constructor(public http: Http) {
        this.fh = $fh

        // get cloud host
        this.fh.on('fhinit', (err, cloud) => {
            if (err) { console.error('fhinit', err) }
            this.host = cloud
            // console.info('fhinit successful', this.host)
        })
    }

    private _getHeaders(): {} {
        return this.fh.getFHHeaders()
    }

    private _setHeaders(): void {

    }

    private _handleResponse() { }



    //     public getFHParams(): Promise < any > {
    //     let params = this.fh.getFHParams()
    //         return new Promise((resolve, reject) => { resolve(params) })
    // }

    public pingTest(): Promise<any> {
        let headers = new Headers(this._getHeaders());
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.host, options).toPromise()
        // .then((res) => console.info(res))
        // .catch((err) => console.error(err))
    }
}