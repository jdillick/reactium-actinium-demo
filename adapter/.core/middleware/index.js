const path = require('path');
const _ = require('underscore');
const op = require('object-path');
const globby = require('globby').sync;

const middlewares = () =>
    _.sortBy(
        globby([
            `${APP_DIR}/**/*middleware.js`,
            `${ACTINIUM_DIR}/**/*middleware.js`,
        ]).map(item => {
            const req = require(item);
            const mw = {
                order: op.get(req, 'order', 100000),
                middleware: op.get(req, 'middleware', []),
                name: path.basename(path.dirname(item)),
                file: item,
            };
            mw.middleware = !Array.isArray(mw.middleware)
                ? [mw.middleware]
                : mw.middleware;
            return mw;
        }),
        'order',
    )
        .map(item => {
            delete item.order;
            return item;
        })
        .reduce((items, item) => {
            const { name } = item;
            items[name] = item;
            return items;
        }, {});

module.exports = middlewares();
