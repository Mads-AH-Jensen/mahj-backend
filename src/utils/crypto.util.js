const config = require('config').get('Crypto');
const crypto = require('crypto');

exports.saltHashPassword = (password, salt = genRandomString(config.stringLength)) => {
    return hash(password, salt);
}

genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

hash = (password, salt) => {
    let hash = crypto.createHmac(config.algorithm, salt);
    hash.update(password);
    return { salt, passwordHash: hash.digest('hex') };
};
