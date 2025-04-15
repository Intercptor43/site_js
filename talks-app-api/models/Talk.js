const mongoose = require('mongoose');

const talkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    speaker: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['planned', 'in-progress', 'completed'],
        default: 'planned'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware pour mettre à jour la date de modification
talkSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Talk', talkSchema);