import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

    transform(value: any, args: string[]): any {
        let formattedTime: any;
        switch (args[0]) {
            case 'from now':
                formattedTime = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSS').fromNow();
                break;
            case 'to now':
                formattedTime = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSS').toNow();
                break;
            case 'human':
                formattedTime = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSS').calendar();
                break;
            default:
                formattedTime = moment(value, 'YYYY-MM-DDTHH:mm:ss.SSS').calendar();
                break;
        }
        return formattedTime;
    }

}
