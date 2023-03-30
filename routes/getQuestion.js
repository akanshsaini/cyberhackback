const router = require("express").Router();
const Question = require("../model/question");



router.get("/get_question", async (req, res) => {
    await Question.find({}, (err, questions) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!questions.length) {
        return res
          .status(404)
          .json({ success: false, error: `Question not found` });
      }
      return res.status(200).json({ success: true, data: questions });
    }).catch((err) => console.log(err));
  });
  
  module.exports = router;