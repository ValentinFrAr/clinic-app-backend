const express = require("express");
const { register, login, update, deleteUser, getAllUsers } = require("./auth");
const { adminAuth } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/delete").delete(adminAuth, deleteUser);
router.route("/users").get(getAllUsers); 

module.exports = router;