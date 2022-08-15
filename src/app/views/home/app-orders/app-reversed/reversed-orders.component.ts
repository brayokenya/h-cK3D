import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {IOrder, IOrderFilter} from '../../../../shared/models/orders';
import {OrderFiltersDialogComponent} from '../orders.component';
import {BaseAPIService} from '../../../../shared/services';
import {IPagination} from '../../../../shared/models/base';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-reversed',
  templateUrl: './reversed-orders.component.html',
  styleUrls: ['./reversed-orders.component.scss']
})
export class ReversedOrdersComponent implements OnInit, OnDestroy {
    loading = false;
    searchQuery: string;
    filterParams: IOrderFilter = {
        min_date: new Date(2018, 0, 1),
        max_date: new Date(),
        start_date: null,
        end_date: null,
        currency: null,
        status: 'REVERSED',
        sms_sent: null,
        email_sent: null,
        show_status: false
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
                Object.assign(params, this.getFilterParams());
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
        const params = {payment_method: 'CASH', order_status: 'REVERSED'};
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
