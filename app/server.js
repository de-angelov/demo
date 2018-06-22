const express = require('express');
const app = express();
const config = require('./config/config');

require('./config/express').init(app);
require('./routes').init(app, config);


app.listen(4200, () => {
    console.log('server started port 4200');
});
