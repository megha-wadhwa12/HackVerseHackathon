const { mongo } = require("mongoose");
const mongooseModel = require("../Models/TopicsSchema");
require("dotenv").config();
const { DataValidationSchema } = require("../Validation");

const getAllTopics = async (req, res) => {
  try {
    const AllTopics = await mongooseModel.find({});
    console.log("AllTopic", AllTopics);
    res.status(200).json(AllTopics);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching All Topics" });
  }
};

const getOneTopic = async (req, res) => {
  try {
    const OneTopic = await mongooseModel.findById(req.params.id);
    res
      .status(200)
      .json({ message: `See Topic for ${req.params.id}`, OneTopic });
    if (!OneTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching single Topic" });
  }
};

const AddTopic = async (req, res) => {
  try {
    const { error, value } = DataValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      const allErrors = error.details.map((e) => e.message);
      res.status(400).json({ error: allErrors });
    } else {
      const {
        TopicsName,
        TopicDescription,
        LearnTopic: [],
        learned_by
      } = value;
      console.log('value', value)

      const postTopic = await mongooseModel.create({
        TopicsName,
        TopicDescription,
        LearnTopic,
        learned_by
      });
      res.status(201).json({ message: "Create Topic", postTopic });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error creating new Topic" });
  }
};

const updateAllTopics = async (req, res) => {
    try {
      const updateTopic = await mongooseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Update all Topics", updateTopic });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error Updating Topics" });
    }
  };

  const deleteTopic = async (req, res) => {
    try {
      const deleteOneTopic = await mongooseModel.findByIdAndDelete(
        req.params.id
      );
      if (!deleteOneTopic) {
        return res.status(404).json({
          message: `Topic not found for ${req.params.id}`,
        });
      }
      res.status(200).json({
        message: `Deleted Topic for ${req.params.id}`,
        deleteOneTopic,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error Deleting Topic" });
    }
  };


  module.exports = {
    getAllTopics,
    getOneTopic,
    AddTopic,
    updateAllTopics,
    deleteTopic,
  };