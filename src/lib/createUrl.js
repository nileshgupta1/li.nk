const Models = require('../models');
const urlShortnerHelper = require('../helpers/urlShortner');
// TODO: move this to config later
const incrementSize = 6;

const recursiveInsert = async (longUrl, startIndex, endIndex) => {
    try {
        const shortCode = urlShortnerHelper.generateShortURL(longUrl, startIndex, endIndex);
        console.log(shortCode);
        const [createdObject, created] = await Models.urls.createObject(shortCode, longUrl);
        return { longUrl: createdObject.originalUrl, code: createdObject.code };
        // return Models.urls.createObject(shortCode, longUrl)
        //     .then((createdObject, created) => {
        //         // if ((!created) && (createdObject.originalUrl !== longUrl)) {
        //         //     return recursiveInsert(longUrl, endIndex + 1, endIndex + incrementSize);
        //         // }
        //         return { longUrl: createdObject.originalUrl, code: createdObject.code };
        //     });
    }
    catch (error) {
        console.error(error);
    }
};

module.exports = {
    createShortUrlAndInsert: (longUrl) => {
        const insertPromise = recursiveInsert(longUrl, 0, 5);
        return insertPromise.then(result => result);
        // return insertPromise;
    }
};