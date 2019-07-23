const morgan = require('morgan');
module.exports = {
    order: -10000000,
    middleware: [
        {
            function: morgan('combined'),
        },
    ],
};
