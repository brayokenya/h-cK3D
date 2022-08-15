export interface IBaseInterface {
    id?: string;
    created?: string | Date;
    updated?: string | Date;
    selected?: boolean;
}

export interface IPagination {
    next?: string;
    previous?: string;
    count?: number;
    html_context?: object;
    start_index?: number;
    end_index?: number;
}
