const cookieParser = require('cookie-parser');

module.exports = {
    order: -100000,
    middleware: [
        {
            function: cookieParser(),
        },
    ],
};
