const Hapi = require('@hapi/hapi');
const Routes = require('./routes');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //route method can take an object or an array of objects containing configurations
    server.route(Routes());

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();





