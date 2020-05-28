import { Component, OnInit } from '@angular/core';
import { Post } from 'src/models/post.model';
import { SocketService } from 'src/services/websocket.service';
import { PostService } from 'src/services/post.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-allegiance',
  templateUrl: './allegiance.component.html',
  styleUrls: ['./allegiance.component.scss'],
})
export class AllegianceComponent implements OnInit {

  public posts: Post;

  constructor(private socketService: SocketService, private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.getPosts();
  }

  async getPosts() {
    const response = await this.postService.getPosts().toPromise();
    if (response) {
    }
  }

}
