const path = require('path');
const globby = require('globby').sync;
const clouddir = path.normalize(`${APP_DIR}/cloud`);

// Load cloud functions
globby([`${clouddir}/**/*.js`]).forEach(item => {
    const p = path.normalize(`/${item}`);
    const name = path.join(
        path.basename(path.dirname(item)),
        path.basename(item),
    );

    CLOUD_FUNCTIONS.push({ name, file: p });
    require(p);
});
