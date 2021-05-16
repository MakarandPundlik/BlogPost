const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/user");
require("dotenv").config();

//get the user's email from accesstoken provided
const getuserEmail = (accesstoken) => {
  let email = "";
  jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
    if (err) return err;
    email = decoded.email;
  });
  return email;
};

module.exports.editProfile = async (req, res) => {
  const { firstname, lastname, email, age, gender } = req.body;

  await userSchema
    .findOneAndUpdate(
      { email },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          age: age,
          gender: gender,
        },
      },
      { useFindAndModify: false }
    )
    .then((result) => {
      console.log(result);
      return res.json({ msg: "Profile has been edited successfully..." });
    })
    .catch((err) => {
      console.log(err);
    });
};

//get users profile
module.exports.getUserProfile = async (req, res) => {
  const { accesstoken } = req.body;
  const email = getuserEmail(accesstoken);

  await userSchema
    .aggregate([
      { $match: { email: email } },
      {
        $project: {
          _id: 0,
          firstname: 1,
          lastname: 1,
          email: 1,
          age: 1,
          gender: 1,
        },
      },
    ])
    .then((user) => {
      if (!user)
        return res.json({ msg: "Profile not found", status: "Notfound" });
      return res.json({
        user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
