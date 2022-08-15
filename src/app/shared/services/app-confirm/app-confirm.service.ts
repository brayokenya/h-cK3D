import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Injectable} from '@angular/core';

import {AppConfirmComponent} from './app-confirm.component';

interface IConfirmData {
    title?: string;
    message?: string;
}

@Injectable()
export class AppConfirmService {

    constructor(private dialog: MatDialog) {
    }

    public confirm(data: IConfirmData = {}): Observable<boolean> {
        data.title = data.title || 'Confirm';
        data.message = data.message || 'Are you sure?';
        let dialogRef: MatDialogRef<AppConfirmComponent>;
        dialogRef = this.dialog.open(AppConfirmComponent, {
            width: '380px',
            disableClose: true,
            data: {title: data.title, message: data.message}
        });
        return dialogRef.afterClosed();
    }
}
