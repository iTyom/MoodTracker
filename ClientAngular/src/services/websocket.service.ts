import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
// import { Message } from '../model/message';
import { Event } from '../models/enum';
import { Socket } from 'ngx-socket-io';
import * as socketIo from 'socket.io-client';
import { User } from 'src/models/login.model';

const SERVER_URL = 'http://localhost:8008';

@Injectable()
export class SocketService {

    constructor(private socket: Socket) { }

    public sendUser(user: User): void {
        this.socket.emit('user', user);
    }

    public sendMessage(message) {
        console.log("SocketService -> sendMessage -> message", message);
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}
