const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const createAccessToken = require("../middlewares/tokenMiddlewares");
const nodemailer = require("nodemailer");

//signup handler
module.exports.signup_post = (req, res) => {
  const { firstname, lastname, email, password,about,age,gender } = req.body.profile;

  //common error object
  let errors = { email: "", password: "" };
  //check for the existing user
  userSchema
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        errors.email = "User already exists";

        return res.json({ errors });
      } else {
        const newUser = new userSchema({
          firstname,
          lastname,
          email,
          password,
          about,
          age,
          gender
        });

        //hash passwords before saving to the database
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            errors.password = "Something went wrong while hashing";

            return res.json({ errors });
          } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                errors.password = "Something went wrong while hashing";

                return res.json({ errors });
              } else {
                newUser.password = hash;
                const today = new Date();
                newUser.last_activity = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
                newUser.save();

                //send mail to user regarding login activity
                const mail = {
                  from: "blogpost.example@gmail.com",
                  to: email,
                  subject: "Signup Activity",
                  html: `<h2>Dear ${firstname} ${lastname} </h2><p> <b>Welcome to BlogPost.com</b><p><b>A perfect place to blend your blogs</b><p>`,
                };

                //set up nodemailer
                const contactEmail = nodemailer.createTransport({
                  service: "gmail",
                  host: "blogpost.example.com",
                  port: 465,
                  secure: true,
                  auth: {
                    user: "",
                    pass: "",
                  },
                });

                contactEmail.verify((error) => {
                  if (!error) console.log("ready to send...");
                  else console.log(error);
                });

                contactEmail.sendMail(mail, (err) => {
                  if (!err)
                    console.log(
                      `An email has been sent successfully to ${email}`
                    );
                  else console.log(err);
                });
                //create accesstoken  for user
                const accesstoken = createAccessToken(newUser);

                return res.json({
                  msg: "user signed in successfully",
                  accesstoken: accesstoken,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => console.log(err));
};

//login handler
module.exports.login_post = (req, res) => {
  const { email, password } = req.body.profile;
  let errors = { email: "", password: "" };
  //console.log(email,password);
  //check for the existing email
  userSchema
    .findOneAndUpdate({ email },{useFindAndModify:false})
    .then((user) => {
      if (!user) {
        errors.email = "User does not exists";

        return res.json({ errors: errors });
      } else {
        //check the hasged passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err || !isMatch) {
            errors.password = "Please Enter the valid password";

            return res.json({ errors });
          } else {
             //save recent activity of user
             const today = new Date();
             user.last_activity = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
            //create accesstoken  for user
            const accesstoken = createAccessToken(user);
            //send mail to user regarding login activity
            const mail = {
              from: "blogpost.example@gmail.com",
              to: email,
              subject: "Login Activity",
              html: `<h2>Dear ${email} </h2><p> <b>Your last login activity was detected at ${new Date()}</b>`,
            };

            //set up nodemailer
            const contactEmail = nodemailer.createTransport({
              service: "gmail",
              host: "blogpost.example.com",
              port: 465,
              secure: true,
              auth: {
                 user: "",
                pass: "",
              },
            });

            contactEmail.verify((error) => {
              if (!error) console.log("ready to send...");
              else console.log(error);
            });

            contactEmail.sendMail(mail, (err) => {
              if (!err)
                console.log(`An email has been sent successfully to ${email}`);
              else console.log(err);
            });

           
         
            return res.json({
              msg: "user logged in successfully",
              accesstoken: accesstoken,
              username: user.firstname,
              about:user.about
            });
          }
        });
      }
    })
    .catch((err) => console.log(err));
};
