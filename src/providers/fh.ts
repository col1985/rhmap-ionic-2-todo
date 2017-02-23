import { Injectable } from '@angular/core';

import $fh from 'fh-js-sdk';

import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class FH {
    private fh

    constructor() {
        this.fh = $fh

        this.fh.on('fhinit', (err, res) => {
            if (err) {
                console.error('fhinit: ', err);
            }
            console.info('fhinit successful')
        })
    }

    getHost(): string {
        return this.fh.getCloudHost()
    }

    getHeaders() {
        return this.fh.getFHHeaders()
    }

    getParams() {
        return this.fh.getFHParams()
    }

    // "path" only the path part of the url, the host will be added automatically
    // "method" all other HTTP methods are supported as well. For example, HEAD, DELETE, OPTIONS
    // "contentType" should always be application/json
    // "data" data to send to the server
    // "timeout" timeout value specified in milliseconds. Default: 60000 (60s)
    cloud(requestParams: any) {
        return new Promise((resolve, reject) => {
            this.fh.cloud(requestParams, (success) => resolve(success), (error) => reject(error))
        })
    }

    auth() {
        console.info('This is auth call..')
    }

    push(message: any, options: any) {
        return new Promise((resolve, reject) => {
            this.fh.push(message, options, (err, success) => {
                if (err) {
                    console.error('fhpush: ', err.toString());
                } else {
                    console.log('fhpush : ', success);
                }
            })
        })
    }

    // cloud(endpoint: string, params?: any, options?: any) {
    //     return new Promise((resolve, reject) => {

    //     })
    // }
}