const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true
        
    },
    password: {
        type: String,
        required: true
        
    },
    image: {
        type: String,
        required: true
        
    },
    type:{
        type: Number,
        required: true
    }
  
});

module.exports = mongoose.model('register', registerSchema);