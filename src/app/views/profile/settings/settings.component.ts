import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../../shared/services';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({url: 'upload_url'});
    public hasBaseDropZoneOver = false;
    userForm: FormGroup;
    firstNameFormControl: FormControl;
    lastNameFormControl: FormControl;
    emailFormControl: FormControl;
    phoneFormControl: FormControl;

    constructor(public auth: AuthService) {
        this.firstNameFormControl = new FormControl(this.auth.user.first_name, [Validators.required]);
        this.lastNameFormControl = new FormControl(this.auth.user.last_name, [Validators.required]);
        this.emailFormControl = new FormControl(this.auth.user.email, [Validators.email, Validators.required]);
        this.phoneFormControl = new FormControl(this.auth.user.phone_number, [Validators.required]);
    }

    ngOnInit() {
        this.userForm = new FormGroup(
            {
                first_name: this.firstNameFormControl,
                last_name: this.lastNameFormControl,
                email: this.emailFormControl,
                phone_number: this.phoneFormControl,
            }
        );
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public updateProfile() {
    }
}
