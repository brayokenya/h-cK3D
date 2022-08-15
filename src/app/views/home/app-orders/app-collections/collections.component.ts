import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BaseAPIService} from '../../../../shared/services';
import {IPagination} from '../../../../shared/models/base';
import {appAnimations} from '../../../../shared/animations/app-animations';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss'],
    animations: appAnimations
})
export class CollectionsComponent implements OnInit {
    loading: boolean;
    charges: ICharge[];
    status: IChargeStatus = {KES: 0, UGX: 0, RWF: 0, USD: 0};
    pagination: IPagination;
    page = 1;

    constructor(private apiService: BaseAPIService,
                private toast: ToastrService,
                private cd: ChangeDetectorRef) {
        this.getCollections();
    }

    ngOnInit() {
    }

    getCollections() {
        this.apiService.list<{pagination: IPagination, results: ICharge[]}>(`${environment.CHARGES_ENDPOINT}`).subscribe(
            resp => {
                this.charges = resp.results;
                this.pagination = resp.pagination;
            },
            (err) => {},
            () => {
                this.apiService.list<IChargeStatus>(
                    `${environment.CHARGES_ENDPOINT}total_charges/`).subscribe(
                    resp => {
                        this.status = resp;
                    },
                    (err) => {},
                    () => {
                        this.cd.detectChanges();
                    }
                );
            }
        );
    }

    getPage(nextPage) {
        if (!this.loading) {
            this.loading = true;
            const params = {page: `${nextPage}`};
            this.apiService.list<{pagination: IPagination, results: ICharge[]}>(
                `${environment.CHARGES_ENDPOINT}`, params).subscribe(
                resp => {
                    this.charges = resp.results;
                    this.pagination = resp.pagination;
                    this.page = nextPage;
                },
                (err) => {},
                () => {
                    this.loading = false;
                    this.cd.detectChanges();
                }
            );
        }
    }
}

export interface ICharge {
    id?: string;
    user?: any;
    amount: number;
    amount_currency: string;
    description: string;
    content_type: number;
    object_id: string;
    created: string;
}

export interface IChargeStatus {
    KES: number;
    UGX: number;
    RWF: number;
    USD: number;
}
