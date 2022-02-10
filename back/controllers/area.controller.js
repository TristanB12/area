require('dotenv').config();

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { user } = require('../models');
const db = require("../models");
const jwt = require('./jwt');

const User = db.user;

/**
 * Login function for service area
 * @param {*} req 
 * @param {*} res 
 * @returns Responce to client request (400: Problem with credentials / 200: Success login)
 */
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "You should provide email and password." });

  let user = await User.findOne({ 'auth.email': email });
  if (!user)
    return res.status(400).json({ message: "Email address is not correct." });
  if (user.auth.auth_type != 'email')
    return res.status(400).json({ message: `Email address is assigned with a ${user.auth.auth_type} account.` });
  if (!(await bcrypt.compare(password, user.auth.password)))
    return res.status(400).json({ message: "Password is not correct." });
  const response = {
    access_token: jwt.generateAccessToken(user._id),
    token_type: "Bearer",
    expires_in: (process.env.ACCESS_TOKEN_EXPIRATION_HOUR * 60) * 60,
    refresh_token: user.auth.refreshToken,
  };
  return res.status(200).json(response);
}

/**
 * Check the credentials for a simple signup with service area signup
 * @param {*} credentials Object with email, password and confirmPassword
 * @returns Message if problem with the given param
 */
const checkCredentials = (credentials) => {
  let message = undefined;

  const filterSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().regex(
      new RegExp(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,32}$/)
    ),
    confirmPassword: Joi.any().valid(Joi.ref('password'))
  })
  const { error, value } = filterSchema.validate(credentials);
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        message = 'You must provide a valid email adress';
        break;
      case 'password':
        message = `Your password should contains:<br>
                              - 8 to 32 characters<br>
                              - at least two letters (upper and lowercase)<br>
                              - one number<br>
                              - one special character`;
        break;
      case 'confirmPassword':
        message = 'Passwords are different';
      default:
        message = 'Invalid registration informations';
        break;
    }
  }
  return message;
}

/**
 * Signup function for service area
 * @param {*} req 
 * @param {*} res 
 * @returns Responce to client request (400: Problem with credentials / 201: Success signup)
 */
async function signup(req, res) {
  const { password, email } = req.body;
  let passwordMessage = undefined;

  if (!password || !email)
    return res.status(400).json({ message: "You should provide email and password." });
  if (passwordMessage = checkCredentials(req.body))
    return res.status(400).json({ message: passwordMessage });
  const oldUser = await User.findOne({ 'auth.email': email });
  if (oldUser)
    return res.status(409).send({ message: "Email already taken." });
  const hash = await bcrypt.hash(password, 10);
  let user = await User.create({
    auth: {
      auth_type: 'email',
      email: email,
      password: hash,
      refreshToken: "",
    }
  });
  const refreshToken = jwt.generateRefreshToken(user._id, user.auth.email);
  let createdUser = await User.findOneAndUpdate({ 'auth.email': email }, { $set: { 'auth.refreshToken': refreshToken } });

  const response = {
    access_token: jwt.generateAccessToken(createdUser._id, createdUser.auth.email),
    token_type: "Bearer",
    expires_in: (process.env.ACCESS_TOKEN_EXPIRATION_HOUR * 60) * 60,
    refresh_token: refreshToken,
  };
  return res.status(201).json(response);
}

async function getUserInfos(req, res) {
  const { user } = req;
  
  return res.status(200).json({
    email: user.auth.email,
    email_verified: user.email_verified,
  });
}

module.exports = { login, signup, getUserInfos };