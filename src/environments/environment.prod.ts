const API_HOST          =   'https://api.mookh.com';
const DEFAULT_LANGUAGE  =   'en';
const WS_HOST           =   'wss://api.mookh.com/live';
const TILE_SERVER_HOST  =   '';

export const environment = {
    production              :   true,
    title                   :   'Mookh Agents',
    APP_LABEL               :   'agents_dashboard',
    API_HOST                :   `${API_HOST}`,
    DEFAULT_LANGUAGE        :   `${DEFAULT_LANGUAGE}`,
    WS_HOST                 :   `${WS_HOST}/live/`,
    TILE_SERVER_HOST        :   `${TILE_SERVER_HOST}`,
    USERS_BACKEND           :  {
        USER_ENDPOINT           :   `${API_HOST}/api/accounts/user/`,
        REGISTRATION_ENDPOINT   :   `${API_HOST}/api/accounts/register/`
    },
    ENABLE_AUTH             : true,
    AUTH_BACKEND            :   {
        AUTH_PARAM          :   'email',   // email or username
        AUTH_HEADER_PREFIX  :   'Bearer',
        TOKEN :   {
            default: true,
            AUTH_ENDPOINT       :   `${API_HOST}/users/login/`,
        },
        JWT :   {
            default: false,
            AUTH_ENDPOINT               :   '/api-token-auth/',
            AUTH_VERIFICATION_ENDPOINT  :   '/api-token-verify/',
            TOKEN_REFRESH_ENDPOINT      :   '/auth-token-refresh/'
        },
    },
    ORDERS_ENDPOINT                         :   `${API_HOST}/stores/orders/`,
    CHARGES_ENDPOINT                        :   `${API_HOST}/payments/charges/`,
    REMITTANCES_ENDPOINT                    :   `${API_HOST}/payments/remittances/`,
    PAGINATION_SIZE                         :   50
};
