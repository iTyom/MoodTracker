import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authApi = 'http://localhost:8004/auth/login';
    private enigmaApi = 'http://localhost:8008/enigma/';
    private allowedOrigin: string[] = ['http://localhost:8008'];

    constructor(private httpClient: HttpClient) { }

    public login(login: string) {
        const headers = new HttpHeaders({
            Authorization: login, 'Access-Control-Allow-Origin': this.allowedOrigin,
            'Access-Control-Allow-Methods': 'GET,POST'
        });
        return this.httpClient.get(this.authApi, { headers });
    }

    public subscribe() {
        
    }

    public getCodeToExecute(token: string, langage: { langage: string }) {
        const headers = new HttpHeaders({
            'x-access-token': token, 'Access-Control-Allow-Origin': this.allowedOrigin,
            'Access-Control-Allow-Methods': 'GET,POST'
        });
        return this.httpClient.post(this.enigmaApi + 'getCodeToExecute', langage, { headers });
    }

    public getValidationSlug(token: string) {
        const headers = new HttpHeaders({
            'x-access-token': token, 'Access-Control-Allow-Origin': this.allowedOrigin,
            'Access-Control-Allow-Methods': 'GET,POST'
        });
        return this.httpClient.get(this.enigmaApi + 'getValidationSlug', { headers });
    }

    public getBatch(token: string) {
        const headers = new HttpHeaders({
            'x-access-token': token, 'Access-Control-Allow-Origin': this.allowedOrigin,
            'Access-Control-Allow-Methods': 'GET,POST'
        });
        return this.httpClient.get(this.enigmaApi + 'getBatch', { headers });
    }
}
