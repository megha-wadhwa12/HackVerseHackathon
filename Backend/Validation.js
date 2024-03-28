const Joi = require("joi");

const UserValidationSchema = Joi.object({
  Name: Joi.string().min(3).max(20).required(),
  UserName: Joi.string().min(4).max(20).required(),
  EmailId: Joi.string().email().required(),
  Password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    )
    .required()
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.'
    }),
  Topics: Joi.array().items(Joi.string()),
  Rank: Joi.number().required()
});

let SubTopic = Joi.object().keys({
    SubTopicName: Joi.string().min(3).max(20).required(),
    SubTopicContent: Joi.string().required(),
    isLearned: Joi.boolean().default(false).required()
  })

const DataValidationSchema = Joi.object({
    TopicName: Joi.string().min(3).max(20).required(),
    TopicDescription: Joi.string().min(5).max(3000).required(),
  LearnTopics: Joi.array().items(SubTopic),
  learned_by: Joi.string().required()
});

module.exports = { UserValidationSchema, DataValidationSchema };
