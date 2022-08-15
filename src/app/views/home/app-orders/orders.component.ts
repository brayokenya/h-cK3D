import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IOrder, IOrderFilter} from '../../../shared/models/orders';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}


@Component({
    selector: 'app-filter-orders',
    templateUrl: './dialogs/filter-dialog/filter-dialog.component.html',
})
export class OrderFiltersDialogComponent {
    constructor(public dialogRef: MatDialogRef<OrderFiltersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IOrderFilter
    ) {}

    onOkClick(): void {
        this.dialogRef.close('filter');
    }

    onNoClick(): void {
        this.dialogRef.close('cancel');
    }
}


@Component({
    selector: 'app-order-amount',
    templateUrl: './dialogs/order-amount/amount-dialog.component.html',
})
export class OrderAmountDialogComponent {
    constructor(public dialogRef: MatDialogRef<OrderFiltersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {amount: number; order: IOrder}
    ) {}

    onOkClick(): void {
        this.dialogRef.close('complete');
    }

    onNoClick(): void {
        this.dialogRef.close('cancel');
    }
}
