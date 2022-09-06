import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router) {}

/////////////////////////////////
/// vérifier que l'utilisateur a un Token
/// sinon --> redirection vers page connection
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.auth.getToken();
        if (token) {
            return true;
        } else {
            this.router.navigateByUrl("/auth/login");
            return false;
        }
    }
}