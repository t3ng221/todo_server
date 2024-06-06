const User = require("../schema/userSchema");

const createUser = async (user) => {
  const newUser = new User(user);
  const createdUser = await newUser.save();
  console.log(createdUser);
  return createdUser;
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email.toString() });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail
};
