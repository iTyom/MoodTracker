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

  private posts: Post;
  public demons: [];
  public angels: [];
  public ratioAngels: int;
  public ratioDemons: int;

  constructor(private socketService: SocketService, private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.init();
    console.log('saluuuuuuuuuuuuut');
  }

  async init() {
    await this.getPosts();
    await this.getDemonMessages();
    await this.getAngelMessages();
    console.log('coucou');
  }

  async getPosts() {
    console.log('3');
    const response = await this.postService.getPosts().toPromise();
    if (response) {
      console.log("AllegianceComponent -> getPosts -> response", response);

      this.posts = response;
    }
  }

  async getDemonMessages() {
    this.demons = this.posts.filter(a => a.allegiance === 'demon');

    this.ratioDemons = (this.demons.length / this.posts.length) * 100


  }

  async getAngelMessages() {
    this.angels = this.posts.filter(a => a.allegiance === 'ange');

    this.ratioAngels = (this.angels.length / this.posts.length) * 100
  }

}
