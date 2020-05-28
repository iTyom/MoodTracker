import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SocketService } from 'src/services/websocket.service';
import { PostService } from 'src/services/post.service';
import { AuthService } from 'src/services/auth.service';
import { Post } from 'src/models/post.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {
  post: Post = new Post();
  messageList: string[] = [];
  demonPosts: Post[] = [];
  angePosts: Post[] = [];
  constructor(private socketService: SocketService, private postService: PostService, private authService: AuthService) {
    this.init();
  }

  init() {
    this.getPosts();
  }

  addPost() {
    const response = this.postService.addPost(this.post).toPromise();
  }

  addAngePost() {
    this.post.allegiance = 'ange';
    this.angePosts.push(this.post);
    this.addPost();
    this.post = new Post();
  }

  addDemonPost() {
    this.post.allegiance = 'demon';
    this.demonPosts.push(this.post);
    this.addPost();
    this.post = new Post();
  }

  async getPosts() {
    this.demonPosts = await this.postService.getPostsByAllegience("demon").toPromise() as Post[];
    this.angePosts = await this.postService.getPostsByAllegience("ange").toPromise() as Post[];
  }

  ngOnInit() {
    this.post.allegiance = "ange";
    this.getPosts();
    // this.postService.
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
