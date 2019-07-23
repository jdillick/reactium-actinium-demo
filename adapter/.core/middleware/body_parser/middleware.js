const bodyParser = require('body-parser');

module.exports = {
    order: -100000,
    middleware: [
        {
            function: bodyParser.json(),
        },
        {
            function: bodyParser.urlencoded({ extended: true }),
        },
    ],
};
