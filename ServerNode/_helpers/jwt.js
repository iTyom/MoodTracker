const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    // isRevoked,
    isAuthorized,
};


// async function isRevoked(req, payload, done) {
//     const user = await userService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!user) {
//         return done(null, true);
//     }

//     done();
// };

async function isAuthorized(req, res, next) {
    let token = req.headers['authorization'];
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        console.log("isAuthorized -> yes");

        // On save dans la req pour récupérer plus tard
        req.userId = decoded.user._id;
        next();
    });
}