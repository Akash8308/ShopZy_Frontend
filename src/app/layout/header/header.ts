import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Login } from "../../feature/auth/pages/login/login";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showLogin = false;

  openLogin() {
    this.showLogin = true;
  }

  closeLogin() {
    this.showLogin = false;
  }

}
