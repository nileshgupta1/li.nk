
module.exports = (sequelize, DataTypes) => {
    const urls = sequelize.define('urls', {
        code: { type: DataTypes.STRING(6), unique: true },
        originalUrl: DataTypes.STRING
    }, {});
    urls.createObject = (code, originalUrl) => urls.findOrCreate({
        where: { code: code },
        defaults: { originalUrl: originalUrl }
    });
    urls.getLongUrl = (code) => urls.findOne({ where: { code: code } });
    return urls;
}

// const [user, created] = await User.findOrCreate({
//     where: { firstName: 'John' },
//     defaults: { lastName: 'Doe' }
// });

// Sequelize will first try to find a user where the `firstName` is 'John'.
// If it finds one, it returns that user and `created` will be `false`.
// If it doesn't find a user, it creates one with `firstName` 'John' and `lastName` 'Doe', and `created` will be `true`.
