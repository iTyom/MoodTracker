const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helpers/db');
const User = db.User;
const bcrypt = require('bcrypt');
const { base64decode } = require('nodejs-base64');
module.exports = {
    login,
    getAll,
    getById,
    register,
    update,
    delete: _delete
};

const jwtExpirySeconds = 14400;

async function login(req, res) {
    var loginEncoded = req.headers['authorization'];
    if (!loginEncoded) return res.status(401).send({ auth: false, message: 'Erreur de login' });

    let loginDecoded = base64decode(loginEncoded);
    let loginSplited = loginDecoded.split(":");
    let login = loginSplited[0];
    let password = loginSplited[1];

    const user = await User.findOne({ login });
    if (user && bcrypt.compareSync(password, user.password)) {
        user.password = null;
        const token = jwt.sign({ user }, config.secret, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds,
            issuer: 'https://laresistance.fr'
        })
        const { hash, ...userWithoutHash } = user.toObject();
        return {
            ...userWithoutHash,
            token
        };
    } else {
        return "Erreur de password";
    }
}

async function publicKey() {
    // jwt en RSA256 et encodé en 2048
    // export en PEM la clé public et privé
    // privé pour chiffrer, et public pour dechiffrer
    // 1 - donne clé public please 
    // 2 - 
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function register(userParam) {
    // validate
    const user = new User(userParam);
    if (await User.findOne({ username: userParam.login })) {
        throw 'Username "' + userParam.login + '" is already taken';
    }

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    user.login = userParam.login;
    user.lastName = userParam.lastName;
    user.firstName = userParam.firstName;

    // save user
    await user.save();
    return user;
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.pwd) {
        userParam.password = userParam.pwd;
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    console.log("id", id)
    await User.findByIdAndRemove(id);
}