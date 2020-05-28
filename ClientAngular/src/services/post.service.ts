import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'src/models/login.model';
import { Post } from 'src/models/post.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class PostService {

    private authApi = 'http://localhost:8004/auth/login';
    private allowedOrigin: string[] = ['http://localhost:8008'];
    private authApiRegister = "http://localhost:8004/auth/register";
    private serverApi = "http://localhost:8008/post/addPost";
    private serverApiGetPost = "http://localhost:8008/post/getPosts";

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    public addPost(post: Post) {
        console.log("PostService -> addPost -> token", this.authService.getToken());
        const headers = new HttpHeaders({
            Authorization: this.authService.getToken(), 'Access-Control-Allow-Origin': this.allowedOrigin,
            'Access-Control-Allow-Methods': 'GET,POST',
        });

        console.log("PostService -> addPost -> post", post);
        return this.httpClient.post(this.serverApi, post, { headers: headers });

    }

    // public getPost(user: string) {
    //     const headers = new HttpClient({
    //         Authorization: user, 'Access-Control-Allow-Origin': this.allowedOrigin,
    //         'Access-Control-Allow-Methods': 'GET,POST',
    //     });

    //     return this.httpClient.get(this.serverApiGetPost, { headers });
    // }

}
