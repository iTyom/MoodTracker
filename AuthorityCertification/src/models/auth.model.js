const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Auth', schema);
