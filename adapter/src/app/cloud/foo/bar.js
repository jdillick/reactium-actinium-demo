/**
 * ----------------------------------------
 *  Collection Definitions
 * ----------------------------------------
 */
const COLLECTION = 'Bar';

// BEFORE SAVE Bar
Parse.Cloud.beforeSave(COLLECTION, req => {
    return Promise.resolve(true);
});
// AFTER SAVE Bar
Parse.Cloud.afterSave(COLLECTION, req => {
    return Promise.resolve(true);
});
// BEFORE DELETE Bar
Parse.Cloud.beforeDelete(COLLECTION, req => {
    return Promise.resolve(true);
});
// AFTER DELETE Bar
Parse.Cloud.afterDelete(COLLECTION, req => {
    return Promise.resolve(true);
});
// BEFORE FIND Bar
Parse.Cloud.beforeFind(COLLECTION, req => {
    return Promise.resolve(true);
});

/**
 * ----------------------------------------
 *  Cloud Definitions
 * ----------------------------------------
 */
Parse.Cloud.define('bar', req => {
    return Promise.resolve({
        foo: 'bar'
    });
});
