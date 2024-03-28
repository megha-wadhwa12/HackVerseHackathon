const mongoose = require('mongoose')

const TopicsSchema = mongoose.Schema({
    TopicName: {type: String,required: [true, "Please Add TopicName"]},
    TopicDescription: {type: String,required: [true, "Please Add Description about the topic"]},
    LearnTopic: [{
        SubTopicName: {type: String, required: [true, "Please Add Subtopic Name"]},
        SubTopicContent: {type: String, required: [true, "Please Add Content for the given Subtopic"]},
        isLearned: {type: Boolean, required: [true, "Please Tell if Topic is learnt by the Student or not"]},
    }],
    learned_by: {type: String, required: [true, "Please Add the Name of User"]}
})

const mongooseModel = mongoose.model("topics", TopicsSchema)

module.exports = mongooseModel