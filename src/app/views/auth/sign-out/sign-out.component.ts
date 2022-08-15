import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services';

@Component({
    selector: 'app-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) {
        this.auth.logout();
    }

    ngOnInit() {
    }

}
