const cookieSession = require('cookie-session');

module.exports = {
    order: -100000,
    middleware: [
        {
            function: cookieSession({
                name: '4lqaOOlW1',
                keys: ['Q2FtZXJvbiBSdWxlcw', 'vT3GtyZKbnoNSdWxlcw'],
            }),
        },
    ],
};
