'use strict'

const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const http = require('http');

var app = express();

app.use(function (req, res, next) {
    res.setTimeout(5000);
    next();
});

app.set('port', (process.env.PORT || 5000));
app.set('trust proxy', true);


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(methodOverride());
app.use(cookieParser());

app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    if (err.stack) {
        console.error(err.stack);
    }
    else {
        console.error(err);
    }

    res.status(500);
    res.send('500: Internal server error');
});


app.use('/', express.static('../client/build'))


app.use('/users', require('./routes/users'))
app.use('/search', require('./routes/search'))

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


//========= Exceptions ================================
process.on('uncaughtException', function (error) {
    if (error) {
        console.error("Not cached exception with out stack! : " + error.stack);
    }
    else if (error.stack) {
        console.error(error.stack);
    }
    else {
        console.error(error);
    }
});

process.on('unhandledRejection', function (reason, p) {
    if (reason) {
        console.error("Not handled cached exception with out stack! : " + reason.stack);
    }
    else if (reason.stack) {
        console.error(reason.stack);
    }
    else {
        console.error(reason);
    }
});