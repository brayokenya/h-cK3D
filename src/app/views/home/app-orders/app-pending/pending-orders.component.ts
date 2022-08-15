import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {IOrder, IOrderFilter} from '../../../../shared/models/orders';
import {OrderAmountDialogComponent, OrderFiltersDialogComponent} from '../orders.component';
import {IPagination} from '../../../../shared/models/base';
import {BaseAPIService} from '../../../../shared/services';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-pending',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit, OnDestroy {
    loading = false;
    selectToggleFlag = false;
    selectedOrders: IOrder[] = [];
    activeOrder: IOrder;
    searchQuery: string;
    filterParams: IOrderFilter = {
        min_date: new Date(2018, 0, 1),
        max_date: new Date(),
        start_date: null,
        end_date: null,
        currency: null,
        status: 'PENDING',
        sms_sent: null,
        email_sent: null,
        show_status: false
    };
    dialogResponse = {
        amount: 0,
        order: null
    };
    orders: IOrder[];
    pagination: IPagination;
    page = 1;

    constructor(private apiService: BaseAPIService,
                private cd: ChangeDetectorRef,
                public dialog: MatDialog,
                private toast: ToastrService) {
        this.filterAll();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    selectToggleAll() {
        this.selectToggleFlag = !this.selectToggleFlag;
        this.orders.forEach((order) => {
            order.selected = this.selectToggleFlag;
        });
    }

    stopProp(e) {
        e.stopPropagation();
    }

    filterOrderSelection() {
        this.selectedOrders = this.orders.filter(od => od.selected);
    }

    launchFilterDialog() {
        const dialogRef = this.dialog.open(
            OrderFiltersDialogComponent, {width: '320px', height: '425px', data: this.filterParams}
        );
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'filter') {
                this.apiService.list<{pagination: IPagination, results: IOrder[]}>(
                    `${environment.ORDERS_ENDPOINT}`, this.getFilterParams()).subscribe(
                    resp => {
                        this.pagination = resp.pagination;
                        this.orders = resp.results;
                        this.page = 1;
                    },
                    (err) => {},
                    () => { this.cd.detectChanges(); }
                );
            }
        });
    }

    launchAmountDialog(order: IOrder) {
        this.dialogResponse.order = order;
        this.activeOrder = order;
        const dialogRef = this.dialog.open(
            OrderAmountDialogComponent,
            {width: '300px', data: this.dialogResponse}
        );
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'complete') {
                const receivedAmount = this.dialogResponse.amount;
                if (!Number.isInteger(receivedAmount)) {
                    this.toast.error('Please enter valid order amount.');
                } else {
                    if (receivedAmount > 0) {
                        this.apiService.create<any>(`${environment.ORDERS_ENDPOINT}complete_cash_order/`,
                            {order_number: order.order_number, amount: receivedAmount},
                            this.getFilterParams()).subscribe(
                            resp => {
                                this.filterAll();
                            },
                            (err: HttpErrorResponse) => {},
                            () => {
                                this.toast.success(`Successfully completed order ${order.order_number}.`);
                            }
                        );
                    } else {
                        this.toast.warning('Amount received cannot be zero.');
                    }
                }
            }
        });
    }

    onSearch() {
        this.loading = true;
        const params = this.getFilterParams();
        Object.assign(params, {search: this.searchQuery});
        this.apiService.list<{ pagination: IPagination, results: IOrder[] }>(
            `${environment.ORDERS_ENDPOINT}`,
            params).subscribe(
            resp => {
                this.orders = resp.results;
                this.filterParams.status = null;
            },
            (err: HttpErrorResponse) => {
            },
            () => {
                this.loading = false;
            }
        );
    }

    resendOrder(order: IOrder) {
        this.apiService.create<any>(`${environment.ORDERS_ENDPOINT}resend_tickets/`,
            {orders: [order.id]},
            this.getFilterParams()).subscribe(
            resp => {
            },
            (err: HttpErrorResponse) => {
            },
            () => {
                this.toast.success(`Successfully resent order ${order.order_number}.`);
            }
        );
    }

    completeSelected() {
        const orderIds = [];
        this.selectedOrders.forEach(item => {
            orderIds.push(item.id);
        });
        this.apiService.create<any>(`${environment.ORDERS_ENDPOINT}complete/`,
            {orders: orderIds},
            this.getFilterParams()).subscribe(
            resp => {
            },
            (err: HttpErrorResponse) => {
            },
            () => {
                this.toast.success(`Successfully completed the orders.`);
            }
        );
    }

    resendSelected() {
        const orderIds = [];
        this.selectedOrders.forEach(item => {
            orderIds.push(item.id);
        });
        this.apiService.create<any>(`${environment.ORDERS_ENDPOINT}resend_tickets/`,
            {orders: orderIds},
            this.getFilterParams()).subscribe(
            resp => {
            },
            (err: HttpErrorResponse) => {
            },
            () => {
                this.toast.success(`Successfully resent the orders.`);
            }
        );
    }

    filterAll() {
        if (!this.loading) {
            this.loading = true;
            this.apiService.list<{ pagination: IPagination, results: IOrder[] }>(`${environment.ORDERS_ENDPOINT}`,
                this.getFilterParams()).subscribe(
                resp => {
                    this.orders = resp.results;
                    this.pagination = resp.pagination;
                },
                (err: HttpErrorResponse) => {
                },
                () => {
                    this.filterParams.status = null;
                    this.page = 1;
                    this.loading = false;
                    this.cd.detectChanges();
                }
            );
        }
    }

    getPage(nextPage) {
        if (!this.loading) {
            this.loading = true;
            const params = {page: `${nextPage}`};
            if (this.filterParams.status) {
                Object.assign(params, {order_status: this.getFilterParams()});
            }
            this.apiService.list<{ pagination: IPagination, results: IOrder[] }>(
                `${environment.ORDERS_ENDPOINT}`, params).subscribe(
                resp => {
                    this.orders = resp.results;
                    this.pagination = resp.pagination;
                    this.page = nextPage;
                },
                (err: HttpErrorResponse) => {
                },
                () => {
                    this.loading = false;
                    this.cd.detectChanges();
                }
            );
        }
    }

    getFilterParams() {
        const params = {payment_method: 'CASH', order_status: 'PENDING'};
        if (this.filterParams.end_date) {
            Object.assign(params, {created_max: this.filterParams.end_date.toISOString().split('T')[0]});
        }
        if (this.filterParams.start_date) {
            Object.assign(params, {created_min: this.filterParams.start_date.toISOString().split('T')[0]});
        }
        if (this.filterParams.sms_sent !== null) {
            Object.assign(params, {flag_sms_sent: !this.filterParams.sms_sent});
        }
        if (this.filterParams.email_sent !== null) {
            Object.assign(params, {flag_email_sent: !this.filterParams.email_sent});
        }
        if (this.filterParams.currency) {
            Object.assign(params, {order_currency: this.filterParams.currency});
        }
        return params;
    }
}
