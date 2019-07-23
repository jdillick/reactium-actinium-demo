const cors = require('cors');

module.exports = {
    order: -1000000,
    middleware: [
        {
            function: cors(),
        },
    ],
};
