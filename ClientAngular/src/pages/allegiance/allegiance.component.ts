import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Post } from 'src/models/post.model';
import { SocketService } from 'src/services/websocket.service';
import { PostService } from 'src/services/post.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allegiance',
  templateUrl: './allegiance.component.html',
  styleUrls: ['./allegiance.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllegianceComponent implements OnInit {

  private posts: Post[];
  public demons: Post[];
  public angels: Post[];
  public ratioAngels: number;
  public ratioDemons: number;

  constructor(
    private socketService: SocketService,
    private postService: PostService,
    private authService: AuthService,
    private router: Router) {
    if (!authService.isUserConnected()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.getPosts();
    await this.getDemonMessages();
    await this.getAngelMessages();
  }

  async getPosts() {
    const response = await this.postService.getPosts().toPromise();
    if (response) {
      this.posts = response as Post[];
    }
  }

  async getDemonMessages() {
    this.demons = this.posts.filter(a => a.allegiance === 'demon');
    this.ratioDemons = (this.demons.length / this.posts.length) * 100;
  }

  async getAngelMessages() {
    this.angels = this.posts.filter(a => a.allegiance === 'ange');
    this.ratioAngels = (this.angels.length / this.posts.length) * 100;
  }
}
