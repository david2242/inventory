import {Component} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {UserService} from "../../services/user.service";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
    standalone: true,
    imports: [MatToolbarModule, NgIf, MatButtonModule, RouterLink, AsyncPipe]
})
export class NavbarComponent {

  constructor(
    public auth: AuthService,
    public user: UserService
  ) {
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }
}
