import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatProgressBar} from '@angular/material';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    userEmail;
    @ViewChild(MatProgressBar, {static: false}) progressBar: MatProgressBar;
    @ViewChild(MatButton, {static: false}) submitButton: MatButton;

    constructor() {
    }

    ngOnInit() {
    }

    submitEmail() {
        this.submitButton.disabled = true;
        this.progressBar.mode = 'indeterminate';
    }
}
