import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/login.model';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.user = new User();
    this.user.password = "Tom";
    this.user.login = "Tom";
  }

  register() {
    this.authService.register(this.user).subscribe((data: User) => {
      this.user = data;
      if (this.user) {
        this.router.navigate(["login"]);
      }
    });
  }
}
