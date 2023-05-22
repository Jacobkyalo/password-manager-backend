const express = require("express");
const router = express.Router();
const {
  createPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
} = require("../controllers/passwordController");
const { authorize } = require("../middleware/auth");

router.get("/", authorize, getAllPasswords);
router.post("/", authorize, createPassword);
router.put("/:id", authorize, updatePassword);
router.delete("/:id", authorize, deletePassword);

module.exports = router;
