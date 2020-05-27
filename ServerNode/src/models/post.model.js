const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   text: String,
   postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   allegiance: String
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', schema);