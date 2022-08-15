import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {appAnimations} from 'src/app/shared/animations/app-animations';

@Component({
    selector: 'app-signup4',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    animations: appAnimations
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {

        const aPassword = new FormControl('', Validators.required);
        const confirmPassword = new FormControl('', CustomValidators.equalTo(aPassword));

        this.signUpForm = this.fb.group(
            {
                username: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: aPassword,
                agreed: [false, Validators.required]
            }
        );
    }

    onSubmit() {
        if (!this.signUpForm.invalid) {
            // do what you what with your data
            console.log(this.signUpForm.value);
        }
    }
}
