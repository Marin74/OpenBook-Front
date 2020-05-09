import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService,
              private titleService: Title) {
    this.setTitle("OpenBook");
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        }
        else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
