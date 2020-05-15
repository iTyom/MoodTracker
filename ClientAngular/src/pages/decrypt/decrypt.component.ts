import { Component, OnInit } from '@angular/core';
import { User } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/websocket.service';

import { Action } from '../../models/enum';
import { Event } from '../../models/enum';
import { stringify } from 'querystring';
@Component({
    selector: 'app-decrypt',
    templateUrl: './decrypt.component.html',
    styleUrls: ['./decrypt.component.scss']
})
export class DecryptComponent implements OnInit {

    public user: User;
    // action = Action;
    // user: User;
    messages: string[] = [];
    messageContent: string;
    ioConnection: any;
    action = Action;
    token: string;
    validationSlug: string;
    result: string;
    messageDecrypted: string;
    codeToExecute: string;
    error: string;
    messageCrypted: string;
    batch: any;
    decryptedBatch: decryptedBatch;

    constructor(private socketService: SocketService, private authService: AuthService) {
    }

    ngOnInit() {
        this.token = localStorage.getItem('token');

        console.log('token', this.token);
        this.getProfil();
        this.initIoConnection();
        this.getCodeToExecute();
        this.onBatch();
        this.waitBatch();
    }



    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: any) => {
                this.messages.push('lol');
            });

        // this.socketService.onBatch().subscribe(batch => {
        //     console.log("batch", batch)
        //     this.batch = batch;
        // })

        this.sendUser(this.user);

        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });
    }

    public onBatch() {
        this.socketService.onBatch().subscribe(batch => {
            // if (!this.batch && this.codeToExecute && this.validationSlug) {
            // console.log('Dispo', batch)
            this.batch = batch;
            // } else {
            // console.log('Non Dispo')

            // }
        })
    }

    public async waitBatch() {
        if (!this.batch && this.codeToExecute && this.validationSlug) {
            this.onBatch();
            console.log('Dispo')
        } else {
            // Non dispo
            console.log('Non dispo');
            this.socketService.sendNotAvailable(1000);
            this.getBatch();
        }
        await this.delay(1000);

        this.waitBatch();
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then();
    }

    public sendMessage(message: string): void {
        if (!message) {
            return;
        }

        this.socketService.send({
            from: this.user,
            content: this.messageDecrypted
        });
        this.messageContent = this.messageDecrypted;
    }

    public sendUser(user: User): void {
        if (!user) {
            return;
        }

        this.socketService.sendUser(this.user);
        this.messageContent = this.messageDecrypted;
    }

    public getCodeToExecute() {
        const langage: { langage: string } = { langage: 'js' };
        const response = this.authService.getCodeToExecute(this.token, langage).toPromise();
        response.catch(data => {
            this.error = data.error.message;
            console.log(data)
        }).then(codeToExecute => {
            if (codeToExecute) {
                this.codeToExecute = atob(codeToExecute as string);
            }
        });
    }

    public getValidationSlug() {
        this.authService.getValidationSlug(this.token).subscribe((validationSlug: string) => {
            this.validationSlug = validationSlug;
        });
    }

    public getBatch() {
        // this.authService.getBatch(this.token).subscribe(async (batch: batch) => {
        if (this.batch && this.codeToExecute && this.validationSlug) {
            this.messageCrypted = this.batch.data.message;
            this.codeToExecute = this.codeToExecute.replace('[STRING]', '"' + this.batch.data.message + '"');
            // this.messageDecrypted = this.caesarCipher();
            let codeToExecuteCopy;
            for (let i = this.batch.data.fromKey; i < this.batch.data.toKey; i++) {
                codeToExecuteCopy = this.codeToExecute;
                codeToExecuteCopy = codeToExecuteCopy.replace('[FROMKEY]', i.toString());

                // tslint:disable-next-line:no-eval
                const messageDecrypted = eval(codeToExecuteCopy);
                if (messageDecrypted.includes('Tu déconnes pépé !')) {
                    this.result = 'Le message décodé est : ' + messageDecrypted + ' avec la clé : ' + i.toString();
                    // this.sendMessage(this.messageDecrypted);
                    const decryptedBatch: decryptedBatch = {
                        messageCrypted: btoa(this.batch.data.message),
                        messageDecrypted: btoa(messageDecrypted),
                        key: i,
                    };
                    this.sendDecryptedBatch(decryptedBatch);
                    console.log("TCL: DecryptComponent -> getBatch -> decryptedBatch", decryptedBatch)
                    this.batch = null;

                    return this.result;
                } else {

                }
            }
        }


        // this.messageDecrypted = eval(this.codeString);
        // console.log("this.messageDecrypted : ", eval(this.codeString));
        // });
    }

    public sendDecryptedBatch(decryptedBatch: decryptedBatch) {
        this.socketService.sendDecryptedBatch(decryptedBatch);
    }

    // public caesarCipher() {
    //     return 'Vw féeqppgu réré ! N\'jqnqecwuvg c xtckogpv gzkuvé'.toUpperCase()
    //         .replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - 1) % 26 + 65));
    // }

    public getProfil() {
        this.user = new User();
        let tokenDecoded: any;
        if (this.token && this.token.length > 0) {
            tokenDecoded = JSON.parse(atob(this.token.split('.')[1]))
        }
        if (tokenDecoded) {
            this.user.login = tokenDecoded.user.login;
        }
        console.log('this.user.login', this.user.login)
    }
}

export interface batch {
    message: string,
    idMessage: number,
    fromKey: number,
    toKey: number,
}

export interface decryptedBatch {
    messageCrypted: string,
    messageDecrypted: string,
    key: number,
}
