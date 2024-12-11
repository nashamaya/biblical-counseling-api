
const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
emotion: { type: String, required: true, unique: true },
verses: { type: [String], required: true }
})

const Emotion = mongoose.model('Emotion', emotionSchema);

module.exports = Emotion;
