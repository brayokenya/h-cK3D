import {IBaseInterface} from './base';

export interface IStore extends IBaseInterface {
    name: string;
    manager_fk: string;
    manager_name: string;
    description: string;
    store_type: string;
    store_type_name: string;
    store_type_description: string;
    poster: string;
    thumbnails_image: string;
    thumbnails: string;
    country: string;
    currency: string;
    email: string;
    is_private: string;
    phone_number: string;
    is_published: string;
    is_published_to_directory: string;
    no_of_items: string;
    items_sold: string;
    coordinates: string;
    url: string;
    frontend_url: string;
    shortened_url: string;
    wallet: object;
}
