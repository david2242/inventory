import {CanActivateFn} from "@angular/router";
import {UserService} from "./services/user.service";
import {inject} from "@angular/core";

export const authGuardGuard: CanActivateFn = () => {
  const user: UserService = inject(UserService);
  return user.loggedIn;
};
