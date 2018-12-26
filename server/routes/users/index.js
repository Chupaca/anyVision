'use strict'

const users = require('./users.js');
const router  = require('express').Router();

router.post("/registration", users.GetRegistration);
router.post("/login", users.Login);
router.get("/list", users.ValidateUser,  users.GetListUsers);
router.post("/remove", users.ValidateUser,  users.RemoveUserAndAllData);


module.exports = router;