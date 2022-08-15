// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const API_HOST          =   'https://api-v2.staging.mookh.com';
const DEFAULT_LANGUAGE  =   'en';
const WS_HOST           =   'wss://api-v2.staging.mookh.com/live';
const TILE_SERVER_HOST  =   '';

export const environment = {
    production              :   false,
    title                   :   'Mookh Agents',
    APP_LABEL               :   'agents_dashboard',
    DEFAULT_LANGUAGE        :   `${DEFAULT_LANGUAGE}`,
    API_HOST                :   `${API_HOST}`,
    WS_HOST                 :   `${WS_HOST}/live/`,
    TILE_SERVER_HOST        :   `${TILE_SERVER_HOST}`,
    USERS_BACKEND           :  {
        USER_ENDPOINT           :   `${API_HOST}/users/login/`,
        REGISTRATION_ENDPOINT   :   `${API_HOST}/users/user/`
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
