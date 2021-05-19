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

//report generation
module.exports.getReport = (req, res) => {
  const { accesstoken } = req.body;
  const email = getuserEmail(accesstoken);

  userSchema
    .aggregate([
      {$match:{"email":email}},
      {$project:{"_id":0,"blogArray.title":1,"blogArray.date":1,"blogArray.views":1}}
    ])
    .then((user) => {
      //console.log(user);
      res.json({ msg: "Report generated",user });
    })
    .catch((err)=>{
      console.log(err);
    })
};
