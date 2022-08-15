import {SafeResourceUrl} from '@angular/platform-browser';
import {IBaseInterface} from './base';

export interface ILoginResponse {
    token?: string;
    user?: IUser;
}

export interface IUser extends IBaseInterface {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    phone_number?: string;
    profile_photo?: SafeResourceUrl;
    is_seller?: boolean;
    is_superuser?: boolean;
}

export interface IBankAccount extends IBaseInterface {
    brunch_name: string;
    account_number: string;
}

export interface IUserFilter {
    start_date?: any;
    end_date?: any;
    type?: 'admins' | 'merchants' | 'buyers' | 'deactivated';
    merchant_type?: '' | 'event_merchants' | 'digital_merchants' | 'product_merchants' | 'service_merchants'
        | 'merchants_with_no_stores' | 'merchants_with_empty_stores' ;
}
