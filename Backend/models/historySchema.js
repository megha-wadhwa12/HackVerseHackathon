const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    subject: {
        role: { type: String },
        parts: [{
            text: { type: String }
        }]
    },
    username: {type: String}
})

const historyModel = mongoose.model(history, historySchema)

module.exports = historyModel