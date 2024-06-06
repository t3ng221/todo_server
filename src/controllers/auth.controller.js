const { jwtSecret } = require("../config/variables");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const { statusCodes } = require("../helper/statusCodes");
const UserModel = require("../models/userAuth");
const validate = require("../validator/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validationType = "required";
const generateJWTToken = (user) => {
  const token = jwt.sign(user, jwtSecret, {
    expiresIn: "1d",
  });
  return token;
};
//Registration
const userRegistration = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    validate(
      { email, name, password },
      {
        email: "required",
        name: "required",
        password: validationType,
      }
    );
    const hashPassword = await bcrypt.hash(password, 9);

    const user = await UserModel.createUser({
      email,
      name,
      password: hashPassword,
    });
    const token = generateJWTToken({
      email,
      name,
      id: user._id,
    });
    const response = {
      token,
      email,
      name,
      id: user.id,
      _id: user._id,
    };
    res.success(response, "User Registration Successfull");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
//Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.getUserByEmail(email);
    if (!existingUser) {
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40401,
        },
      });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40125,
        },
      });
    }

    const token = generateJWTToken({
      email,
      userId: existingUser._id,
    });
    const response = {
      token,
      email: email,
      name: existingUser.name,
      id: existingUser.id,
      _id: existingUser._id,
    };

    res.success(response, "User Logged In Successfull");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
