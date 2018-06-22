/* globals Buffer */
const request = require('request-promise-native');
const qs = require('qs');

class CallController {
  constructor(config) {
    this.APP_ID = config.APP_ID;
    this.RETURN_URI = config.RETURN_URI;
    this.AUTH_CALL = config.AUTH_CALL;
    this.APP_SECRET = config.APP_SECRET;
    this.PROVIDERS_CALL = config.PROVIDERS_CALL;
    this.ACCESS_TOKEN_CALL = config.ACCESS_TOKEN_CALL;
    this.BANK_AUTH_CALL = config.BANK_AUTH_CALL;
    this.USER_DATA_CALL = config.USER_DATA_CALL;
  }

  async sendAuthCall() {
    request(this.AUTH_CALL, (error, response, body) => {
      // console.log(this.AUTH_CALL);
      // console.log('error:', error);
      // console.log('statusCode:', response && response.statusCode);
    });
  }

  async getAccessToken(clientToken, code) {
    const bodyJSON = {
      'grant_type': 'authorization_code',
      'code': code,
    };
    const encodedBody = qs.stringify(bodyJSON);
    const authString = 'Basic ' + clientToken;
    const options = {
      url: this.ACCESS_TOKEN_CALL,
      method: 'POST',
      headers: {
        'Authorization': authString,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedBody,
    };
    const cb = (error, response, body) => {
      const parsedBody = JSON.parse(body);
      return parsedBody.access_token;
    };
    const accessToken = await request(options, cb);
    const parsedToken = JSON.parse(accessToken);
    return parsedToken.access_token;
  }

  async getBankList() {
    const options = {
      url: this.PROVIDERS_CALL,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'App_id': this.APP_ID,
      },
    };
    const cb = (error, response, body) => {
      const parsedBody = JSON.parse(body);
      return parsedBody.data;
    };
    const list = await request(options, cb);
    const parsedBankList = JSON.parse(list);
    const bankList = [];
    Array.from(parsedBankList.data).forEach((x) => {
      console.log(x.attributes);
      x = { name: x.attributes.name + ' - ' + x.attributes.country, id: x.attributes.provider };
      bankList.push(x);
    });
    return bankList;
  }

  async getBankAuthUrl(accessToken, bankID) {
    console.log('!! => BANK AUTH CALL', this.BANK_AUTH_CALL + bankID + '/auth');
    console.log('!! => ACCESS TOKEN', accessToken);
    const options = {
      url: this.BANK_AUTH_CALL + bankID + '/auth',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
      },
    };
    const cb = (error, response, body) => {
      const parsedBody = JSON.parse(body);

      return parsedBody.url;
    };
    const bankAuthUrl = await request(options, cb);
    const parsedAuthUrl = JSON.parse(bankAuthUrl);
    return parsedAuthUrl.url;
  }

  getClientToken() {
    return Buffer.from(this.APP_ID + ':' + this.APP_SECRET)
      .toString('base64');
  }
  async getUserData(accessToken, customerID) {
    const options = {
      url: this.USER_DATA_CALL + customerID + '/accounts',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
      },
    };
    const cb = (error, response, body) => {
      const parsedBody = JSON.parse(body);
      return parsedBody.url;
    };
    const userData = await request(options, cb);
    return userData;
  }
}


module.exports = CallController;