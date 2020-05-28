import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SocketService } from 'src/services/websocket.service';
import { PostService } from 'src/services/post.service';
import { AuthService } from 'src/services/auth.service';
import { Post } from 'src/models/post.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {
  post: Post = new Post();
  messageList: string[] = [];

  constructor(private socketService: SocketService, private postService: PostService, private authService: AuthService) {

  }

  addPost() {
    const response = this.postService.addPost(this.post).toPromise();
    console.log("ChatComponent -> addPost -> response", response);

  }

  getPosts() {
  }

  ngOnInit() {
    this.post.allegiance = "demon";
    // this.postService.
  }
}
