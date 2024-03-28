const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Name: {type: String,required: [true, "Please Enter Your Name"]},
    UserName: {type: String,required: [true, "Please Enter Your Username"]},
    EmailId: {type: String,required: [true, "Please Add Your e-mail address"]},
    Password: {type: String,required: [true, "Please Enter Your Password"]},
    Topics: [String],
    Rank: {type: Number,required: [true, "Please Add User Rank in Leaderboard"]},
})

const mongooseUserModel = mongoose.model("users", userSchema)

module.exports = mongooseUserModel