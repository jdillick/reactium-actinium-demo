require('./globals');

const cors = require('cors');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
const op = require('object-path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const mw = require('./middleware');
const warnings = require('./lib/warnings');

// Default express options
const defaultOptions = {
    views: APP_DIR + '/view',
    'view engine': 'ejs',
    'x-powered-by': false,
};

let options = {};

const actinium = {};

actinium.ready = false;
actinium.app = null;
actinium.server = null;
actinium.init = opt => {
    LOG(chalk.cyan('Initializing...'));

    options = { ...defaultOptions, ...options, ...opt };

    actinium.app = !actinium.app ? express() : actinium.app;
    const app = actinium.app;

    Object.entries(options).forEach(([key, value]) => {
        LOG(
            chalk.cyan('  Setting'),
            `${key}`,
            chalk.cyan('→'),
            chalk.magenta(value),
        );
        actinium.set(key, value);
    });

    Object.values(mw).forEach(({ middleware, name }) => {
        if (middleware.length > 0) {
            middleware.forEach(item => {
                if (op.has(item, 'function')) {
                    if (op.has(item, 'route')) {
                        app.use(item.route, item.function);
                    } else {
                        app.use(item.function);
                    }
                } else {
                    app.use(item);
                }
            });

            LOG(
                chalk.cyan('  Middleware'),
                chalk.cyan('→'),
                chalk.magenta(name),
            );
        }
    });

    CLOUD_FUNCTIONS.forEach(({ name }) =>
        LOG(chalk.cyan('  Cloud'), chalk.cyan('→'), chalk.magenta(name)),
    );

    actinium.ready = true;
    return Promise.resolve(actinium.app);
};

actinium.set = (key, value) => {
    options[key] = value;
};

actinium.start = options =>
    new Promise((resolve, reject) => {
        try {
            if (actinium.ready !== true) {
                actinium.init(options).then(() => {
                    actinium.start(options);
                });
                return;
            }

            LOG('');
            LOG(chalk.cyan('Starting...'));

            actinium.server = !actinium.server
                ? http.createServer(actinium.app)
                : actinium.server;
            actinium.server.listen(PORT, function(err) {
                if (err) {
                    LOG(err);
                    reject(err);
                } else {
                    LOG(
                        chalk.cyan('  Started'),
                        'on port:',
                        chalk.magenta(PORT),
                    );

                    warnings();

                    resolve(actinium.server);
                }
            });
        } catch (err) {
            reject(err);
        }
    });

module.exports = actinium;
