import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
    name: 'paginateList'
})
export class PaginatePipe implements PipeTransform {
    transform(index: number, page: number): any {
        return `${index + 1 + (page - 1) * environment.PAGINATION_SIZE}.`;
    }
}
