import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
    }

}
