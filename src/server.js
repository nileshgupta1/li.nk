const Hapi = require('@hapi/hapi');
const Routes = require('./routes');
const { createClient } = require('redis');

const redisConfig = require('../config/redis-config.json');
const redisClient = createClient({
    password: redisConfig.password,
    socket: {
        host: redisConfig.host,
        port: redisConfig.port
    }
});
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await redisClient.connect();
    if (redisClient.isOpen) console.log('Redis is ready');
    else console.log('Redis not ready');

    //route method can take an object or an array of objects containing configurations
    server.route(Routes(redisClient));

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();





