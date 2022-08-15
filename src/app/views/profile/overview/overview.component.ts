import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    tasks = [{
        text: 'Awesome store',
        status: 0
    }, {
        text: 'My Music',
        status: 0
    }, {
        text: 'Best Products',
        status: 1
    }, {
        text: 'Wedding Bells',
        status: 1
    }];

    constructor() {
    }

    ngOnInit() {
    }

}
