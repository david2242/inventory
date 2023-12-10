import {Injectable} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {

  loggedInUser$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => this.loggedInUser$.next(user?.email));
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      this.loggedIn$.next(isAuthenticated);
      this.loggedIn = isAuthenticated;
      this.router.navigate(["list"])
    });
  }
}
