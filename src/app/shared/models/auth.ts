import {IBaseInterface} from './base';

export interface IUser extends IBaseInterface {
    first_name: string;
    last_name: string;
    email: string;
    is_email_verified?: boolean;
    phone_number: string;
    is_phone_number_verified?: boolean;
    is_password_changed?: boolean;
    email_code?: boolean;
    profile_photo?: string;
    is_active?: boolean;
    is_staff?: boolean;
    date_joined: Date | string;
    last_login: Date | string;
}

export interface IRoleType extends IBaseInterface {
    name: string;
    permissions?: any;
    is_default: string;
    ownable: boolean;
}

export interface IRole extends IBaseInterface {
    role_type: IRoleType | string;
    user: IUser | string;
    user_hash: string;
    active: boolean;
    suspended: string;
    content_type?: string;
    object_id?: string;
    owner?: string;
}

export interface IUserAddress extends IBaseInterface {
    address: string;
    lat: number;
    lng: number;
    user_fk: IUser | string;
    street: string;
    house_floor: string;
}
