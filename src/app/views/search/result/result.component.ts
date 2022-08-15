import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CountryService} from '../country.service';
import {SearchService} from '../../../shared/search/search.service';

@Component({
    selector: 'app-result-page',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
    countries$: Observable<any[]>;
    searchTermSub: Subscription;

    constructor(
        public searchService: SearchService,
        public countryService: CountryService
    ) {
    }

    ngOnInit() {
        this.searchTermSub = this.searchService.searchTerm$.subscribe(term => {
            this.countries$ = this.countryService.getCountries(term);
        });
    }

    ngOnDestroy() {
        if (this.searchTermSub) {
            this.searchTermSub.unsubscribe();
        }
    }

}
