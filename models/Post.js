const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true
    }
})

module.exports = Post = mongoose.model('post', PostSchema);