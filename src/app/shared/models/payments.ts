import {IBaseInterface} from './base';
import {IUser} from './index';


export interface IBankAccount extends IBaseInterface {
    user?: IUser | string;
    bank_name: string;
    bank_branch: string;
    bank_account_number: string;
    bank_account_name: string;
    phone_number: string;
    currency: string;
    country: string;
}

export interface IProductPricing extends IBaseInterface {
    price: number;
    price_currency: string;
}

export interface IMookhCharge extends IBaseInterface {
    amount: number;
    currency: string;
}

export interface IPayment extends IBaseInterface {
    status: 'COMPLETES' | 'PENDING' | 'CANCELLED';
    amount: number;
    amount_paid: number;
    exchange_rate: number;
    mpesa_receipt_number: string;
    currency: string;
    transaction_code: string;
    transaction_id: string;
    payment_state: string;
    payment_channel: string;
    payment_metadata: object;
    customer_name?: any;
    customer_email?: any;
    customer_phone_number?: any;
    selected?: boolean;
}

export interface IWithdrawal extends IBaseInterface {
    status: 'COMPLETES' | 'PENDING' | 'CANCELLED';
    amount: number;
    currency: string;
    currency_rate: number;
    payment_method: 'MOBILE' | 'BANK';
    payment_reference: string;
    withdrawal_logs: object;
    user: IUser;
    selected?: boolean;
}

export interface IWithdrawalFilter {
    start_date?: string | Date;
    end_date?: string | Date;
    status?: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'REVERSED';
    method?: 'CARD' | 'MOBILE' | 'CASH';
}

export interface IPaymentFilter {
    start_date?: string | Date;
    end_date?: string | Date;
    channel?: 'CARD' | 'MOBILE' | 'CASH';
}
