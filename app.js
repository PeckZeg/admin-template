/**
 *  @fileOverview App Entry
 *  @author PeckZeg
 *  @version 2015-12-11
 */

const debug = require('debug')('admin-template');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const http = require('http');
const swig = require('swig');
const _ = require('lodash');

const config = require('./config');
const routes = {};
const routes_api = {};

var app = express();

app.set('port', config.port[config.env]);

app.set('views', path.join(__dirname, config.public_folder.templates));
app.set('view engine', 'html');
app.set('view cache', false);
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

// app.use(favicon(path.join(__dirname, config.icon.s512)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use('/static', express.static(path.join(__dirname, config.public_folder.static)));

_.each(routes, function(router, name) {
    if (name == '/') return app.use('/', router);
    app.use('/' + name, router);
});

_.each(routes_api, function(api, name) {
    app.use('/api/' + name, api);
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
        err.status = 404;

    next(err);
});

app.use(function(err, req, res, next) {
    var env = app.get('env');

    res.status(err.status || 500).render('error', {
        message: err.message,
        error: env == 'development' ? err : {}
    });
});




var server = http.createServer(app);

server.listen(app.get('port'));

server.on('error', function(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = 'Port: ' + app.get('port');

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;
    }
});

server.on('listening', function() {
    var addr = server.address();
    var bind = typeof addr === 'string'
               ? 'pipe' + addr
               : 'port' + addr.port;

    debug('正在监听端口: ' + bind);
});