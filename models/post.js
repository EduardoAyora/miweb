var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Post', Post);
