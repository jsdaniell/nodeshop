const path = require('path');

const bodyParser = require('body-parser');

const express = require('express');

const adminData = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'pug');

const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

// Capturing any request that not have a defined response

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
});

app.listen(port);