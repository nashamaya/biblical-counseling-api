const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    unique: true,
},
description: {
    type: [String],
    required: true,
},
verses: { type: [String], required: true }
})

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;

