import {IBaseInterface} from './base';
import {IStore} from './store';

export interface IOrderSale {
    USD: number;
    KES: number;
    UGX: number;
    RWF: number;
}

export interface ICustomer {
    name?: string;
    phone_number?: string;
    email?: string;
}

export interface IOrder extends IBaseInterface {
    order_number: string;
    order_amount: number;
    order_balance: string;
    order_status: 'COMPLETE' | 'PENDING' | 'REVERSED';
    order_channel: 'WEB' | 'USSD' | 'SHORTCODE' | 'MOBILE' | 'WEB';
    order_type?: string;
    customer: ICustomer;
    currency: string;
    delivery_detail?: string;
    payment_method?: string;
    payment_reference?: string;
    payment_installments?: number;
    manual_completion_reason?: string;
    order_detail?: IOrderItem[];
    flag_email_sent: boolean;
    flag_sms_sent: boolean;
    is_gate_purchase: boolean;
    is_mobile_payments: boolean;
    is_verified: boolean;
    is_shipping: boolean;
    is_shared: boolean;
    selected?: boolean;
}

export interface IOrderItem extends IBaseInterface {
    order_fk: IOrder | string;
    store: IStore | string;
    content_type?: number;
    item_id: string;
    item_quantity: number;
    extra_item_quantity: number;
    item_number: string;
    selling_price: number;
    promo_amount: number;
    discount_amount: number;
    shipping_cost: number;
    is_shipping?: boolean;
    delivery_detail?: string;
}

export interface IOrderFilter {
    min_date?: any;
    max_date?: any;
    start_date?: any;
    end_date?: any;
    status?: 'COMPLETE' | 'PENDING' | 'REVERSED';
    currency?: 'KES' | 'UGX' | 'RWF' | 'USD';
    sms_sent?: boolean;
    email_sent?: boolean;
    show_status?: boolean;
}

export interface IPaymentLocation {
    id?: string;
    name: string;
    description: string;
    // location: GeoJson;
    latitude: number;
    longitude: number;
}
