import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    /**
     * Guard to protect access to all protected routes. Unauthorized users are redirected to login page.
     */
    auth: any;

    constructor(private router: Router, auth: AuthService) {
        this.auth = auth;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const isLoggedIn = this.auth.isLoggedIn();

        if (isLoggedIn) {
            return true;
        }

        this.router.navigate(
            ['/auth/signin'],
            {queryParams: {returnUrl: state.url}}).then(val => console.log(val), err => console.log(err));
        return false;
    }
}
