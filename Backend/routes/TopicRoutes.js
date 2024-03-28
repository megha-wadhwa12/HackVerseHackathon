const express = require("express");
const TopicRoutes = express.Router()
const { getAllTopics, getOneTopic, AddTopic,updateAllTopics, deleteTopic
} = require('./../Controllers/TopicControllers')

TopicRoutes.get('/',getAllTopics)

TopicRoutes.get('/:id', getOneTopic)

TopicRoutes.post('/',AddTopic)

TopicRoutes.put('/:id', updateAllTopics)

TopicRoutes.delete('/:id', deleteTopic)


module.exports = TopicRoutes