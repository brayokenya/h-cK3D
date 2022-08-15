export interface ICollection {
    ticketing: {
        sales: {
            amount: number,
            percentage: number
        },
        commission: {
            amount: number,
            percentage: number
        }
    };
    music: {
        sales: {
            amount: number,
            percentage: number
        },
        commission: {
            amount: number,
            percentage: number
        }
    };
    ebooks: {
        sales: {
            amount: number,
            percentage: number
        },
        commission: {
            amount: number,
            percentage: number
        }
    };
    overall: {
        sales: number,
        commission: number,
        withdrawal: number,
        owed: number
    };
}

export interface IMetrics {
    counts: {
        stores: number,
        events: number,
        music: number,
        ebooks: number
    };
    orders: {
        total: number,
        completed: {count: number, percentage: number},
        pending: {count: number, percentage: number},
        reversed: {count: number, percentage: number}
    };
    users: {
        total: number,
        admins: {count: number, percentage: number},
        merchants: {count: number, percentage: number},
        buyers: {count: number, percentage: number}
    };
    payments: {
        total: number,
        mobile: {count: number, percentage: number},
        card: {count: number, percentage: number},
        cash: {count: number, percentage: number},
        other: {count: number, percentage: number}
    };
    ticketing: {
        events: number,
        active: number,
        in_active: number,
        tickets: number,
        promo_codes: number,
        reservations: number,
        reservations_sold: number,
        complementary_reservations: number,
        promo_reservations: number
    };
    digital_content: {
        music: number,
        ebooks: number,
        all_items: number
    };
}
