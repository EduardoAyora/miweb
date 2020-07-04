var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

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
      type: String,
      required: true
    },
    sanitizedHtml: {
      type: String,
      required: true
    }
},{
    timestamps: true
});

Post.pre('validate', function (next) {
  if(this.content) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.content));
  }
  next();
})

module.exports = mongoose.model('Post', Post);
