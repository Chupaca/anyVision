'use strict'

const users = require('./users.js');
const router  = require('express').Router();

// login and registration
router.post("/registration", users.GetRegistration);
router.post("/login", users.Login);

// management users
router.get("/list", users.ValidateUser,  users.GetListUsers);
router.post("/remove", users.ValidateUser,  users.RemoveUserAndAllData);


module.exports = router;