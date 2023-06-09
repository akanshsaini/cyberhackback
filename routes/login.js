//Imports
const router = require("express").Router();
const Team = require("../model/Team");
const validate = require("../validation/validateUser");
const bcrypt = require("bcryptjs");
const http_status = require("../constants/http_status");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  console.log(req.body);
  //Validate the incoming request body
  const { error, value } = validate(req.body);
  if (error)
    return res.status(http_status.BAD_REQUEST).send(error.details[0].message);

  //Check if a team with same name exists
  const team = await Team.findOne({ teamName: value.teamName });
  if (!team)
    return res
      .status(http_status.BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);

  const validPassword = await bcrypt.compare(value.password, team.password);
  if (!validPassword)
    return res.status(http_status.BAD_REQUEST).send(`Incorrect password`);

  //Create and assing a token
  const token = jwt.sign({ _id: team._id }, ',.>xHj1U#n"_^U[');
  return res.header("auth-token", token).send({ message: "Login Successful" });
});

module.exports = router;
