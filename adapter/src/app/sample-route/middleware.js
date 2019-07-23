const express = require('express');

const router = express.Router();
router.get('/sample', (req, res) => {
    res.send('hello bruh!');
});

module.exports = {
    order: 10000,
    middleware: [router],
};
