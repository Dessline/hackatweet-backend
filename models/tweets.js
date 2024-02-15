const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  content: String,
  date: Date,
  likes: Number,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'hashtags' }]
});

const User = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;