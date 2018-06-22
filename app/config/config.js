const APP_ID = `57456d63-124d-4733-b363-42facb124422`;
const APP_SECRET='e16ff798-a2eb-4fac-b0e3-db816d5f8cb7'; 
const RETURN_URI = 'http://127.0.0.1:4200/';
const AUTH_CALL = `https://api-sandbox.fintecture.com/oauth/token/authorize?app_id=${APP_ID}&redirect_uri=${RETURN_URI}&response_type=code`;
const ACCESS_TOKEN_CALL='https://api-sandbox.fintecture.com/oauth/accesstoken';
const PROVIDERS_CALL = `https://api-sandbox.fintecture.com/res/v1/providers`;
const BANK_AUTH_CALL= `https://api-sandbox.fintecture.com/provider/`;
const USER_DATA_CALL= `https://api-sandbox.fintecture.com/ais/v1/customer/`; 
module.exports={
    APP_ID,
    RETURN_URI,
    AUTH_CALL,
    ACCESS_TOKEN_CALL,
    PROVIDERS_CALL,
    APP_SECRET,
    BANK_AUTH_CALL,
    USER_DATA_CALL,
};
