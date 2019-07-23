const path = require('path');
const chalk = require('chalk');
const moment = require('moment');
const op = require('object-path');

const stringToBoolean = val => {
    if (typeof val === 'string') {
        switch (String(val).toLowerCase()) {
            case 'true':
                return true;

            case 'false':
                return false;
        }
    }

    return val;
};

const stringToArray = val => {
    if (typeof val === 'string') {
        return JSON.parse(val);
    }

    return val;
};

global.BASE_DIR = path.normalize(path.resolve(path.join(__dirname, '..')));
global.SRC_DIR = path.normalize(path.resolve(path.join(BASE_DIR, 'src')));
global.APP_DIR = path.normalize(path.resolve(path.join(SRC_DIR, 'app')));
global.ACTINIUM_DIR = __dirname;
global.ENV = require(`${BASE_DIR}/.core/boot`).environment;
global.PORT = ENV.APP_PORT || ENV.PORT;
global.CLOUD_FUNCTIONS = [];

ENV.LOG = stringToBoolean(op.get(ENV, 'LOG', true));
ENV.PARSE_DASHBOARD_USERS = stringToArray(
    op.get(ENV, 'PARSE_DASHBOARD_USERS', []),
);
ENV.PARSE_DASHBOARD_ALLOW_INSECURE_HTTP = stringToBoolean(
    op.get(ENV, 'PARSE_DASHBOARD_ALLOW_INSECURE_HTTP', true),
);
ENV.NO_PARSE = stringToBoolean(op.get(ENV, 'NO_PARSE', false));
ENV.NO_DOCS = stringToBoolean(op.get(ENV, 'NO_DOCS', false));

global.LOG = (...args) => {
    if (!ENV.LOG) {
        return;
    }
    const time = `[${chalk.magenta(moment().format('HH:mm:ss'))}]`;
    const name = `[${chalk.cyan(String(ENV.APP_NAME))}]`;
    console.log(time, name, ...args);
};
