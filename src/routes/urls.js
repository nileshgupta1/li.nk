const createUrlLib = require('../lib/createUrl');
const Models = require('../models');

module.exports = () => [{
    method: 'POST',
    path: '/shorten',
    handler: async (request, h) => {
        const longUrl = request.payload.url;
        const result = await createUrlLib.createShortUrlAndInsert(longUrl);
        return result;
    },
}, {
    method: 'GET',
    path: '/longUrl',
    handler: async (request, response) => {
        const shortUrl = request.query.code;
        const result = await Models.urls.getLongUrl(shortUrl);
        return result.originalUrl;
    },
}];