const mongoose = require('mongoose')


const Schema = mongoose.Schema


const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    goals: Number,
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Player', playerSchema);