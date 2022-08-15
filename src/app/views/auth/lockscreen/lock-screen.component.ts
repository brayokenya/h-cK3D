import {Component, OnInit, ViewChild} from '@angular/core';
import {MatProgressBar, MatButton} from '@angular/material';

@Component({
    selector: 'app-lock-screen',
    templateUrl: './lock-screen.component.html',
    styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {
    @ViewChild(MatProgressBar, {static: false}) progressBar: MatProgressBar;
    @ViewChild(MatButton, {static: false}) submitButton: MatButton;

    lockScreenData = {
        password: ''
    };

    constructor() {
    }

    ngOnInit() {
    }

    unlock() {
        console.log(this.lockScreenData);

        this.submitButton.disabled = true;
        this.progressBar.mode = 'indeterminate';
    }
}
