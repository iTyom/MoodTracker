import { Component, OnInit } from "@angular/core";
import { User } from "../../models/login.model";
import { AuthService } from "../../services/auth.service";
import { SocketService } from "../../services/websocket.service";

import { Action } from "../../models/enum";
import { Event } from "../../models/enum";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public user: User;
  // action = Action;
  // user: User;
  messages: string[] = [];
  messageContent: string;
  ioConnection: any;
  action = Action;

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = new User();
    this.user.password = "Tom";
    this.user.login = "Tom";
    // this.initIoConnection();
  }

  login() {
    const loginEncode: string = btoa(
      this.user.login + ":" + this.user.password
    );

    this.authService.login(loginEncode).subscribe((data: User) => {
      this.user = data;
      if (this.user.token) {
        localStorage.setItem("token", this.user.token);
        this.router.navigate(["decrypt"]);
      }
    });
  }
}

export interface Message {
  message: string;
}
