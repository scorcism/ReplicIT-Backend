const express = require('express');
const Member = require('../models/Member');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const Doctor = require('../models/Doctor');
const JWT_SECRET = "supermanbatmansinchan"






// contains routes for 

/**
 * show all doctors
 * show doctors all doctors created by mr
 * show all the thing to admin
 * only show mr the dashboard and registration check what is the userType of the currentSUer login then perform the logic required
 * 
 * 
 * 
 * 
 * 
 * 
 */


