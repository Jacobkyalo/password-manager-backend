const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Password = require("../models/passwords");
const User = require("../models/users");

//create a new password to database
const createPassword = asyncHandler(async (req, res) => {
  const { accountName, accountPassword } = req.body;

  if (!accountName || !accountPassword) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  // hash account password
  const salt = await bcrypt.genSalt(10);
  const hashedAccountPassword = await bcrypt.hash(accountPassword, salt);

  const newPassword = await Password.create({
    accountName,
    accountPassword: hashedAccountPassword,
    user: req.user.id,
  });

  res.status(201).json(newPassword);
});

//Retrieve all passwords from database
const getAllPasswords = asyncHandler(async (req, res) => {
  const passwords = await Password.find({ user: req.user.id });
  res.status(200).json(passwords);
});

//update a password in the database
const updatePassword = asyncHandler(async (req, res) => {
  const password = await Password.findById(req.params.id);

  //check if there is password
  if (!password) {
    res.status(400);
    throw new Error("Password not found!");
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const passwordToBeUpdated = await Password.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    passwordToBeUpdated,
    message: `password ${passwordToBeUpdated._id} updated successfully`,
  });
});

//delete a password from the database
const deletePassword = asyncHandler(async (req, res) => {
  const password = await Password.findById(req.params.id);

  if (!password) {
    res.status(404);
    throw new Error("Password not found!");
  }

  passwordToBeDeleted = await password.deleteOne();
  res.status(200).json({
    deletedPasword: passwordToBeDeleted,
    message: `password ${passwordToBeDeleted._id} deleted successfully`,
  });
});

module.exports = {
  createPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
};
