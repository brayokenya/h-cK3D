import {Pipe, PipeTransform} from '@angular/core';
import * as numeral from 'numeral';


@Pipe({
    name: 'format'
})
export class FormatterPipe implements PipeTransform {

    transform(value: any, currency?: any): any {
        let cur;
        if (currency === 'KES') {
            cur = 'Ksh';
        } else if (currency === 'UGX') {
            cur = 'USh';
        } else if (currency === 'RWF') {
            cur = 'FRw';
        } else if (currency === 'USD') {
            cur = 'US$';
        } else {
            cur = value;
        }
        const amount = numeral(value).format('0,0.00');
        if (currency) {
            return cur + amount;
        }
        return amount;
    }
}
