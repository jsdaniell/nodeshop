const path = require('path');

const bodyParser = require('body-parser');

const express = require('express');

const adminData = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const app = express();



const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

// Capturing any request that not have a defined response

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port);