const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('job', jobSchema);
