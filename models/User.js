const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('user', UserSchema)