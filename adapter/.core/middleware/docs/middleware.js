const middleware = [];
const path = require('path');
const op = require('object-path');
const express = require('express');
const { spawn } = require('child_process');

if (!op.get(ENV, 'NO_DOCS', false)) {
    // Generate docs
    const docs = spawn('npx', ['apidoc', '-i', 'src/app/cloud', '-o', 'docs']);

    // Create the router
    const router = express.Router();

    // /docs route and static serve content
    const dir = path.join(BASE_DIR, 'docs');
    router.use('/docs', express.static(dir));

    // Add to middleware array
    middleware.push(router);
}

module.exports = {
    order: 0,
    middleware,
};
