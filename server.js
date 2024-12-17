
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Emotion = require('./contents/emotion');
const Topic = require('./contents/topics');

const authRoutes = require('./auth/authRoutes');

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB', err))
console.log("MongoDB URL:", process.env.MONGODB_URL)

// API endpoint to get verses by emotion
app.get('/api/verses', async (req, res) => {
    const emotion = req.query.emotion;
    if (!emotion) return res.status(400).json({ error: 'Emotion is required' });
    
    try {
        const result = await Emotion.findOne({ emotion });
        if (!result) return res.status(404).json({ error: 'Emotion not found' });
        res.json(result)
        
    } catch (err) {
        res.status(500).json({ error: 'server error' });
    }   
})

// API endpoint to get verses by topic
app.get('/api/topics', async (req, res) => {
    const topic = req.query.topic;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

try {
    const result = await Topic.findOne({ topic });
    if (!result) return res.status(404).json({ error: 'Topic not found' });
    res.json(result)
} catch (err) {
    res.status(500).json({ error: 'Server error' });
}
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
