import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/models/login.model';
import { Router } from '@angular/router';
const TOKEN_KEY = "token";
const USER_KEY = "user";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private authApi = 'http://localhost:8004/auth/login';
    private allowedOrigin: string[] = ['http://localhost:8008'];
    private authApiRegister = "http://localhost:8004/auth/register";


    constructor(private httpClient: HttpClient, private router: Router) { }

    public login(login: string) {
        const headers = new HttpHeaders({
            Authorization: login, 'Access-Control-Allow-Origin': this.allowedOrigin,
            'Access-Control-Allow-Methods': 'GET,POST',
        });
        return this.httpClient.get(this.authApi, { headers });
    }

    register(userParam: User) {
        const headers = new HttpHeaders({
            "Access-Control-Allow-Origin": this.allowedOrigin,
            "Access-Control-Allow-Methods": "GET,POST",
        });
        // const param = new HttpParams({userParam})
        return this.httpClient.post(this.authApiRegister, userParam, { headers });
    }

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    getUser() {
        return localStorage.getItem(USER_KEY);
    }

    logout() {
        this.router.navigate(["login"]);
        return localStorage.removeItem(TOKEN_KEY);
    }

    isUserConnected() {
        if (this.getToken() === null)
            return false;
        return true;
    }

}
