// const helper = require('../helpers/urlShortner');

module.exports = {
    method: 'GET',
    path: '/ping',
    handler: (request, h) => {
        return 'pong';
    },
};
