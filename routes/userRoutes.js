const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUserInfo,
} = require("../controllers/userController");
const { authorize } = require("../middleware/auth");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/me", authorize, getUserInfo);

module.exports = router;
