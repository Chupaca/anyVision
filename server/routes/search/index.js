'use strict'

const search = require('./search');
const ValidateUser = require('../users/users').ValidateUser;
const router  = require('express').Router();

router.get("/", ValidateUser, search.Search);
router.get("/track/:id", ValidateUser, search.GetTrack);
router.get("/top", ValidateUser, search.GetToP10);


module.exports = router;