const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   text: { type: String, required: true },
   postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   allegiance: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', schema);