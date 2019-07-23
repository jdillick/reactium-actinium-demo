const middleware = [];
const path = require('path');
const op = require('object-path');
const express = require('express');
const ParseDashboard = require('parse-dashboard');
const ParseServer = require('parse-server').ParseServer;

if (ENV.NO_PARSE !== true) {
    let fileConfig = {};
    if (ENV.S3_ACCESS_KEY && ENV.S3_SECRET_KEY) {
        const S3Adapter = require('@parse/s3-files-adapter');
        const AWS = require('aws-sdk');

        //Configure Digital Ocean Spaces EndPoint
        let s3overrides = {};
        if (ENV.SPACES_ENDPOINT) {
            s3overrides.endpoint = new AWS.Endpoint(ENV.SPACES_ENDPOINT);
        }

        const s3Options = {
            bucket: ENV.S3_BUCKET,
            region: ENV.S3_REGION,
            baseUrl: ENV.S3_BASE_URL,
            s3overrides: {
                accessKeyId: ENV.S3_ACCESS_KEY,
                secretAccessKey: ENV.S3_SECRET_KEY,
                ...s3overrides,
            },
        };

        fileConfig = {
            filesAdapter: new S3Adapter(s3Options),
        };
    }

    // Parse config
    const config = {
        appId: ENV.APP_ID,
        appName: ENV.APP_NAME,
        masterKey: ENV.MASTER_KEY,
        sessionLength: 31536000000,
        databaseURI: ENV.DATABASE_URI,
        cloud: ACTINIUM_DIR + '/cloud.js',
        serverURL: ENV.SERVER_URI + ENV.PARSE_MOUNT,
        publicServerURL: ENV.PUBLIC_SERVER_URI + ENV.PARSE_MOUNT,
        ...fileConfig,
    };

    // rest api key
    if (op.has(ENV, 'REST_API_KEY')) {
        config['restAPIKey'] = ENV.REST_API_KEY;
    }

    // client key
    if (op.has(ENV, 'CLIENT_KEY')) {
        config['clientKey'] = ENV.CLIENT_KEY;
    }

    // javascript key
    if (op.has(ENV, 'JAVASCRIPT_KEY')) {
        config['javascriptKey'] = ENV.JAVASCRIPT_KEY;
    }

    // dotNet key
    if (op.has(ENV, 'DOTNET_KEY')) {
        config['dotNetKey'] = ENV.DOTNET_KEY;
    }

    // Logging
    if (ENV.LOG !== true) {
        config.loggerAdapter = null;
    }

    const server = new ParseServer(config);

    const routerServer = express.Router();
    routerServer.use(ENV.PARSE_MOUNT, server);
    middleware.push(routerServer);
}

if (ENV.PARSE_DASHBOARD === true && !ENV.NO_PARSE) {
    const dashboardConfig = {
        trustProxy: 1,
        users: ENV.PARSE_DASHBOARD_USERS,
        apps: [
            {
                appId: ENV.APP_ID,
                appName: ENV.APP_NAME,
                masterKey: ENV.MASTER_KEY,
                serverURL: ENV.PUBLIC_SERVER_URI + ENV.PARSE_MOUNT,
            },
        ],
    };
    const dashboard = new ParseDashboard(dashboardConfig, {
        allowInsecureHTTP: ENV.PARSE_DASHBOARD_ALLOW_INSECURE_HTTP,
    });

    middleware.push({
        route: ENV.PARSE_DASHBOARD_MOUNT,
        function: dashboard,
    });
}

module.exports = {
    order: 1000000,
    middleware,
};
