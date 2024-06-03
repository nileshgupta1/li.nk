const crypto = require('crypto');

module.exports = {
    generateShortURL: (longURL, startIndex, endIndex) => {
        const hash = crypto.createHash('md5').update(longURL).digest('hex').replace(/\//g, '_').replace(/\+/g, '-');
        // console.log(hash);
        return hash.substring(startIndex, endIndex + 1);
    }
}