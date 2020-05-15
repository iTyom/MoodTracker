import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
// import { Message } from '../model/message';
import { Event } from '../models/enum';

import * as socketIo from 'socket.io-client';
import { batch } from '../pages/decrypt/decrypt.component';
import { User } from 'src/models/login.model';

const SERVER_URL = 'http://localhost:8008';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public initSocketServeyr(): void {

    }

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public sendDecryptedBatch(decryptedBatch: any): void {
        this.socket.emit('decryptedBatch', decryptedBatch);
    }

    public sendUser(user: User): void {
        this.socket.emit('user', user);
    }

    public sendNotAvailable(timeToWait: number) {
        this.socket.emit('notAvailable', timeToWait);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

    public onBatch(): Observable<batch> {
        return new Observable<batch>(observer => {
            this.socket.on('batch', (data) => {
                console.log("data : ")
                observer.next(data);
            });
        })
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
