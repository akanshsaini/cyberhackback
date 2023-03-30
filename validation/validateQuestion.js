//Imports
const Joi = require("joi");

const validateQuestion = (data) => {
  const validationSchema = Joi.object({
    challengeTitle: Joi.string().required(),
    problemStatement: Joi.string().required(),
    URL: Joi.string().required(),
    hints: Joi.string().required(),
    answer: Joi.string().required(),
    maxScore: Joi.number().required(),
  });
  return validationSchema.validate(data)
};

module.exports = validateQuestion;
 