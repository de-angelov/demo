const {
    Router,
} = require('express');
const CallController = require('./controllers/call.controller');


const init = (app, config) => {
    const router = new Router();
    const controller = new CallController(config);
    router
        .get('/', async (req, res) => {
            if (req.query.code) {
                const bankList = await controller.getBankList();
                res.render('home', {
                    bankList: bankList,
                });
            } else if (req.query.customer_id) {
                res.render('info');
            } else {
                await controller.sendAuthCall();
                res.render('load');
            }
        })
        .get('/*', async (req, res) => {
            res.render('load');
        })
        .post('/code', async (req, res) => {
            const code = req.body.code;
            const bankID = req.body.bankID;
            const clientToken = await controller.getClientToken();
            const accessToken = await controller.getAccessToken(clientToken, code);
            const bankAuthUrl = await controller.getBankAuthUrl(accessToken, bankID);
            res.json({
                'url': bankAuthUrl,
            });
        })
        .post('/id', async (req, res) => {
            console.log('!! => id');
            const code = req.body.code;
            const customerID = req.body.customer_id;
            console.log('!! => code', code);
            console.log('!! => customerID', customerID);
            const clientToken = await controller.getClientToken();
            const accessToken = await controller.getAccessToken(clientToken, code);
            const userData = await controller.getUserData(accessToken, customerID);
            res.json({
                'userData': userData,
            });
        });


    app.use('/', router);
};

module.exports = {
    init,
};