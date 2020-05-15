const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

module.exports = {
    User: require('../src/models/auth.model')
};