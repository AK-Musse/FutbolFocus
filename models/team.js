const { name } = require('ejs')
const mongoose = require('mongoose')

const teamSchema =new mongoose.Schema(
    {
        name: {type: String, unique: true},
        founded:Number,
        code: {type: String, unique: true},
        country:String,
        players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        }]
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Team', teamSchema);