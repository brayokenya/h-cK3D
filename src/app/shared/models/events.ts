import {IBaseInterface} from './base';
import {ICustomer} from './orders';
import {IStore} from './store';
import {IMookhCharge} from './payments';

export interface IEventCategory extends IBaseInterface {
    category_name: string;
    event_label: string;
    category_metadata: object;
    icon: string;
}

export interface IReservation extends IBaseInterface {
    ticket_label: string;
    ticket_file: string;
    qr_code: string;
    attendee: ICustomer;
    reservee: ICustomer;
    is_verified: boolean;
    poster?: string;
}

export interface IEvent extends IBaseInterface {
    parent_event_id?: string;
    event_name: string;
    event_description: string;
    event_venue: string;
    event_category_fk: IEventCategory | string;
    event_poster?: string;
    thumbnail_frontend?: string;
    store_fk: IStore | string;
    start_date: Date | string;
    end_date: Date | string;
    latitude: number;
    longitude: number;
    currency: string;
    country: string;
    is_free: boolean;
    is_private: boolean;
    is_published: string;
    is_published_to_directory: string;
    is_staff_pic: string;
    is_featured: string;
    staff_pick_start_date: Date | string;
    staff_pick_end_date: Date | string;
    has_complimentary: boolean;
    has_payment_installments: boolean;
    event_metadata: object;
    gallery?: any;
    payments_mpesa: boolean;
    payments_cards: boolean;
    messages?: any;
    data_fields?: any;
    charges?: IMookhCharge;
}
