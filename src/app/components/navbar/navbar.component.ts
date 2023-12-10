import {Component} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {UserService} from "../../services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
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
