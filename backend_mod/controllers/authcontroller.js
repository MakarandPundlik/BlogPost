const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const createAccessToken = require('../middlewares/tokenMiddlewares');


//signup handler
module.exports.signup_post = (req, res) => {
    const { firstname, lastname, email, password } = req.body.profile;

    //common error object
    let errors = { email: '', password: '' };
    //check for the existing user
    userSchema.findOne({ email: email })
        .then((user) => {
            if (user) {

                errors.email = "User already exists";

                return res.json({ errors });
            }

            else {
                const newUser = new userSchema({
                    firstname,
                    lastname,
                    email,
                    password
                });

                //hash passwords before saving to the database
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        errors.password = "Something went wrong while hashing";

                        return res.json({ errors });
                    }
                    else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                errors.password = "Something went wrong while hashing";

                                return res.json({ errors });
                            }
                            else {
                                newUser.password = hash;
                                newUser.save();


                                //create accesstoken  for user
                                const accesstoken = createAccessToken(newUser);

                               
                                return res.json({ msg: "user signed in successfully",accesstoken:accesstoken,username:user.firstname});
                            }
                        })
                    }
                })


            }
        })
        .catch((err) => console.log(err));

}

//login handler
module.exports.login_post = (req, res) => {
    const { email, password } = req.body.profile;
    let errors = { email: '', password: '' };

    //check for the existing email
    userSchema.findOne({ email })
        .then((user) => {
            if (!user) {
                errors.email = "User does not exists";

                return res.json({ errors: errors });
            }
            else {
                //check the hasged passwords
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err || !isMatch) {
                        errors.password = "Please Enter the valid password";

                        return res.json({ errors });
                    }
                    else {

                        //create accesstoken  for user
                        const accesstoken = createAccessToken(user);
                        
                        return res.json({ msg: "user logged in successfully",accesstoken:accesstoken,username:user.firstname});
                    }
                })
            }
        })
        .catch((err) => console.log(err));

}

