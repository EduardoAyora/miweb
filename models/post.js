var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    title: {
      type: String,
      default: false
    },
    body: {
      type: String,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Post', Post);
