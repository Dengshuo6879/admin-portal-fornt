const umi = require('umi-request');

export const request = umi.extend({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    },
});