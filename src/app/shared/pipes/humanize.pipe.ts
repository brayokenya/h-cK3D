import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'humanize'
})
export class HumanizePipe implements PipeTransform {

    transform(value: any, type?: any): any {
        if (type === 'currency') {
            if (value === 'KES') {
                return 'Ksh';
            } else if (value === 'UGX') {
                return 'USh';
            } else if (value === 'RWF') {
                return 'FRw';
            } else if (value === 'USD') {
                return 'US$';
            } else {
                return value;
            }
        }
        return value;
    }
}
