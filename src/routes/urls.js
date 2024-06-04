const createUrlLib = require('../lib/createUrl');
const Models = require('../models');


module.exports = redisClient => [{
    method: 'POST',
    path: '/shorten',
    handler: async (request, h) => {
        const longUrl = request.payload.url;
        const result = await createUrlLib.createShortUrlAndInsert(longUrl);
        return h.response(result);
    },
}, {
    method: 'GET',
    path: '/longUrl',
    handler: async (request, h) => {
        const shortUrl = request.query.code;
        const hashObject = 'shortUrls';
        const redisResult = await redisClient.hGet(hashObject, shortUrl);
        if (redisResult === null) {
            const result = await Models.urls.getLongUrl(shortUrl);
            if (result !== null) {
                await redisClient.hSet(hashObject, shortUrl, result.originalUrl);
                console.log('Fetched from database');
                return h.response({ originalUrl: result.originalUrl });
            }
            else {
                h.response({ originalUrl: 'Not found' }).code(204);
            }
        }
        else {
            console.log('Fetched from Redis cache');
            return h.response({ originalUrl: redisResult });
        }
    },
}];