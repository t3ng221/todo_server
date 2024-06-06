const { Router } = require("express");
const {
  userRegistration,
  userLogin,
} = require("../controllers/auth.controller");

const router = Router();
router.post("/register", userRegistration);
router.post("/login", userLogin);

module.exports = router;
