import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    successMessages: string[] = [];
    infoMessages: string[] = [];
    warningMessages: string[] = [];
    errorMessages: string[] = [];

    constructor(private toastr: ToastrService) {
    }

    showSuccess(message: string) {
        if (this.successMessages.indexOf(message) < 0) {
            this.successMessages.push(message);
            this.toastr.success(message);
            setTimeout(() => {
                const msgIndex = this.successMessages.map(e => e).indexOf(message);
                this.successMessages.splice(msgIndex, 1);
            }, 5000);
        }
    }

    showInfo(message: string) {
        if (this.infoMessages.indexOf(message) < 0) {
            this.infoMessages.push(message);
            this.toastr.info(message);
            setTimeout(() => {
                const msgIndex = this.infoMessages.map(e => e).indexOf(message);
                this.infoMessages.splice(msgIndex, 1);
            }, 5000);
        }
    }

    showWarning(message: string) {
        if (this.warningMessages.indexOf(message) < 0) {
            this.warningMessages.push(message);
            this.toastr.warning(message);
            setTimeout(() => {
                const msgIndex = this.warningMessages.map(e => e).indexOf(message);
                this.warningMessages.splice(msgIndex, 1);
            }, 5000);
        }
    }

    showError(message: string) {
        if (this.errorMessages.indexOf(message) < 0) {
            this.errorMessages.push(message);
            this.toastr.error(message);
            setTimeout(() => {
                const msgIndex = this.errorMessages.map(e => e).indexOf(message);
                this.errorMessages.splice(msgIndex, 1);
            }, 5000);
        }
    }
}
