const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../src/models/user.model')
};