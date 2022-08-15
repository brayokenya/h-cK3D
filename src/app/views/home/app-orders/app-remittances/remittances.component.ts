import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BaseAPIService} from '../../../../shared/services';
import {IPagination} from '../../../../shared/models/base';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-remittances',
    templateUrl: './remittances.component.html',
    styleUrls: ['./remittances.component.scss']
})
export class RemittancesComponent implements OnInit {
    loading: boolean;
    charges: IRemittance[];
    status: IRemittanceStatus = {KES: 0, UGX: 0, RWF: 0, USD: 0};

    constructor(private apiService: BaseAPIService,
                private toast: ToastrService,
                private cd: ChangeDetectorRef) {
        this.getRemittances();
    }

    ngOnInit() {
    }

    getRemittances() {
        this.apiService.list<{pagination: IPagination, results: IRemittance[]}>(`${environment.REMITTANCES_ENDPOINT}`).subscribe(
            resp => {
                this.charges = resp.results;
            },
            (err) => {},
            () => {
                this.apiService.list<{pagination: IPagination, results: IRemittanceStatus}>(
                    `${environment.REMITTANCES_ENDPOINT}total_remittances/`).subscribe(
                    resp => {
                        this.status = resp.results;
                    },
                    (err) => {},
                    () => {
                        this.cd.detectChanges();
                    }
                );
            }
        );
    }
}

export interface IRemittance {
    id?: string;
    amount: number;
    amount_currency: string;
    status: 'CONFIRMED' | 'PENDING' | 'DENIED' | 'CANCELLED';
    user?: any;
    created: string;
}

export interface IRemittanceStatus {
    KES: number;
    UGX: number;
    RWF: number;
    USD: number;
}
