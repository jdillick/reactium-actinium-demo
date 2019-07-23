const chalk = require('chalk');
const _ = require('underscore');
const op = require('object-path');

module.exports = () => {
    if (!ENV.NO_PARSE) {
        if (ENV.MASTER_KEY === 'VVipSwUXCp7p08vMDREITClNWG9oUSxBl2gDWL0Ffo') {
            LOG('');
            LOG(
                chalk.cyan.bold('Warning:'),
                "Looks like you're using the default Master Key:",
            );
            LOG(
                ' ',
                chalk.cyan('ENV.MASTER_KEY'),
                chalk.cyan('→'),
                chalk.magenta(ENV.MASTER_KEY),
            );
            LOG(' ', 'You should definetly change that bruh!');
        }

        const adminUser =
            _.findWhere(ENV.PARSE_DASHBOARD_USERS, { user: 'admin' }) || {};

        const user = op.get(adminUser, 'user');
        const pass = op.get(adminUser, 'pass');
        if (pass === 'admin') {
            LOG('');
            LOG(
                chalk.cyan.bold('Warning:'),
                "Ehh, you haven't changed the default Parse Dashboard User:",
            );
            LOG(
                ' ',
                chalk.cyan('ENV.PARSE_DASHBOARD_USERS'),
                chalk.cyan('→'),
                chalk.cyan('{'),
                `user: '${chalk.magenta(user)}'`,
                `pass: '${chalk.magenta(pass)}'`,
                chalk.cyan('}'),
            );
            LOG(' ', 'You should do that now, yo!');
        }
    }
};
