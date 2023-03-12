const express = require('express');
const Member = require('../models/Member');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchUser');
const Doctor = require('../models/Doctor');
const JWT_SECRET = "supermanbatmansinchan"
const { body, validationResult } = require('express-validator');

// contains routes for 
/**
 * CREATE
 * /create
 */

// only to create admin
// here we are passing admin id for the dront end
// this cna be any number
// This role will always be 3
router.post('/createadmin', async (req, res) => {
    // console.log(req.body)
    const { name, email, password, id } = req.body;

    // check if member is already present or not
    let user = await Member.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "Admin already exists" })
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hash(password, salt);

    try {
        // let role = 3
        const newMember = await Member.create({
            name, email, password: secPassword, role: 3, adminID: id
        })

        const data = {
            user: {
                id: newMember.id
            }
        }

        let authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ authtoken });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

// only admin can do this
// create manger or tech
// here we will check if the fetch user is admin or not
// this end poit will have access to only two roles i.2 to create new tech memebr or to create manger ot to create new mr
// new mr will have id of manger 
router.post("/createmember", fetchUser, async (req, res) => {

    const adminID = req.user.id;

    const { firstname,lastname, email, password, role } = req.body;

    // check if the current user is admin or not
    // by chcking the role
    try {

        let user = await Member.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Member already exists" })
        }

        const checkAdmin = await Member.findById(adminID);
        // get the user role
        // console.log(checkAdmin)
        const userRole = checkAdmin.role;
        // console.log("role: " + userRole)
        if (userRole == 3) {
            //  the current user is admin
            // he is allowed to create manager or tech member


            const salt = await bcrypt.genSaltSync(10);
            const secPassword = await bcrypt.hash(password, salt);
            const newMember = await Member.create({
                firstname,lastname, email, password: secPassword, role, adminID: checkAdmin.id
            })

            const data = {
                user: {
                    id: newMember.id
                }
            }

            let authtoken = jwt.sign(data, JWT_SECRET);

            res.json({ authtoken });
        }
        else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})


router.post("/createmr", fetchUser, async (req, res) => {

    const managerID = req.user.id;

    const { firstname,lastname, email, password, role, admin } = req.body;

    // check if the current user is admin or not
    // by chcking the role
    try {

        let user = await Member.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Member already exists" })
        }

        const checkManager = await Member.findById(managerID);
        // get the user role
        // console.log(checkManager)
        const userRole = checkManager.role;
        // console.log("role: " + checkManager)
        // we are taking name email passwod role and admin id from the body
        if (userRole == 2 || userRole ==3) {
            //  the current user is admin
            // he is allowed to create manager or tech member
            const salt = await bcrypt.genSaltSync(10);
            const secPassword = await bcrypt.hash(password, salt);

            const newMember = await Member.create({
                firstname,lastname, email, password: secPassword, role, managerID: checkManager._id, adminId: admin
            })

            const data = {
                user: {
                    id: newMember.id
                }
            }

            let authtoken = jwt.sign(data, JWT_SECRET);

            res.json({ authtoken });
        }
        else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})




router.get("/members", [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password Length should >= 5').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const allMembers = await Member.find();
        res.json({ allMembers })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

router.post('/login', async (req, res) => {
    // console.log("Login hit")
    // console.log(req.body)
    const { email, password } = req.body;

    try {
        // console.log("Inside login try")
        let user = await Member.findOne({ email })
        // // console.log(user.email, user.password)

        if (!user) {
            return res.status(400).json({ error: "Enter a valid credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Enter correct credentials" });
        }
        let data = {
            user: {
                id: user.id
            }
        }
        let authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

        // save this token into local storage

    } catch (error) {
        // console.log("Inside login try")
        res.status(500).json({ error: "Internal server error" })
    }
})

// create endpoint to get role form the user id 


router.get('/getmemberdetails', fetchUser, async (req, res) => {
    // this will run automatcally on dashboard
    // will check the local storage and call the function and get all the details 
    try {
        let userID = req.user.id;
        const user = await Member.findById(userID).select('-password')

        res.json({ user })
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

router.get('/getmemberrole', fetchUser, async (req, res) => {
    // this will run automatcally on dashboard
    // will check the local storage and call the function and get all the details 
    try {
        let userID = req.user.id;
        const user = await Member.findById(userID).select('-password')

        const role = user.role
        res.json({ role })
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

router.post('/createdr', fetchUser, async (req, res) => {
    // check if the current user is mr or not
    // console.log("inside createdr")
    const mrID = req.user.id;
    // console.log(mrID)

    const role = await Member.findById(mrID);

    // console.log(role.role)

    const createdBy = role.id
    const updateBy = role.id

    let currenttime = new Date();
    // currenttime.format("dd/MM/yyyy hh:mm TT");

    let status = "New"
    // console.log("id: "+ role)
    try {
        if (role.role <= 3) {
            const {
                mrID, 
                managerID,
                adminID, 
                firstname,
                middlename,
                lastname,
                phone,
                email,
                qualification,
                specialty,
                experience,
                license,
                domain,
                address
            } = req.body;

            const checkDoc = await Doctor.findOne({ email });
            if (checkDoc) {
                return res.status(400).json({ error: "Doctor Exists" })
            }

            const newDoctor = await Doctor.create({
                mrID, 
                managerID,
                adminID, 
                firstname,
                middlename,
                lastname,
                phone,
                email,
                qualification,
                specialty,
                experience,
                license,
                domain,
                address,
                status,
                createdOn:currenttime,
                createdBy:role._id
            })


            // return createNewDoctor;
            res.json({ newDoctor })
        } else {
            return res.status(404).json({ error: "Not allowed" })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

/////// update doctor form by mr
// router.put('/updatedr/:id', fetchUser, async (req, res) => {
//     const userID = req.user.id

//     try {

//         // check if the doctor is present in the table 
//         const doctorID = req.params.id
//         const chechDoctor = await Doctor.findById(doctorID)
//         if (!chechDoctor) { return res.status(404).json({ error: "Not Found" }) }

//         // get the object of new data from the req.body
//         const newData = req.body;
//         d = await Doctor.findByIdAndUpdate(doctorID, { $set: newData })
//         res.send(newData)
//     } catch (error) {
//         // console.log(error)
//         res.status(500).json({ error: "Internal server error ocured" })
//     }
// })


// update doctor status by manager
// we only be alloed to approved or reject 2 condition
// this can be direct single function
// on click of a button
// direct change based on the user type
// take a stirng and make it to that sring
// also change the verified by
router.put('/updatedrstatus/:id', fetchUser, async (req, res) => {
    const doctorID = req.params.id
    const toChangeTo = req.body.tochange;
    try {

        // check if doctors with the id exists or not
        let d = await Doctor.findById(doctorID)
        if (!d) { return res.status(404).send("Not Found") }

        const userID = req.user.id
        const loggedInUser = await Member.findById(userID);
        const loggedInUserID = loggedInUser.id
        const loggedInUserrole = loggedInUser.role
        const todayDate = Date.now();
        // we only want to update the status of the doctor request to approved
        if (loggedInUserrole == 1 || loggedInUserrole == 3) {
            // if the loggedin user is manager then he is allowd to update the status of doctor to approved or rejected
            // find by id and update
            try {
                d = await Doctor.findByIdAndUpdate(doctorID, { $set: { status: toChangeTo, verifiedBy: loggedInUserID, verifiedOn: todayDate } })
                res.json({ d });
            } catch (error) {
                return res.status(401).json({ error: "Not Allowed" });
            }
        } else if (loggedInUserrole == 2 || loggedInUserrole == 3) {
            // the current user is tech member
            // is is allowed to make the status to `certification`
            try {
                d = await Doctor.findByIdAndUpdate(doctorID, { $set: { status: toChangeTo, updatedBy: loggedInUserID, verifiedOn: todayDate } })
                res.json({ d });
            } catch (error) {
                return res.status(401).json({ error: "Not Allowed" });
            }
        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Internal server error ocured" })
    }

})


// get all the doctor of specific mr
router.get('/getdrmr', fetchUser, async (req, res) => {

    // check if the current user is mr or not 
    // if mr get all the doctors
    try {

        const userID = req.user.id;
        const userDetails = await Member.findById(userID)
        const userRole = userDetails.role

        if (userRole == 0 || userRole == 3) {
            const items = await Doctor.find({ mrID: userID });
            res.json({ items });

        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (e) {
        // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

// get all the mr of specific manager
router.get('/getmanagermr', fetchUser, async (req, res) => {

    // check if the current user is mr or not 
    // if mr get all the doctors
    try {

        const userID = req.user.id;
        const userDetails = await Member.findById(userID)
        const userRole = userDetails.role

        if (userRole == 2) {
            const items = await Member.find({ managerID: userID });
            res.json({ items });

        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (e) {
        // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

const ITEMS_PER_PAGE = 10;
// get all the doctors
router.get('/getdrs', fetchUser, async (req, res) => {

    const page = req.query.page || 1;

    try {
        // otehr query parms here
        const query = {

        }

        
        const skip = (page -1) * ITEMS_PER_PAGE; // page 2 items per page 10 so skip 1st 20
        
        // const drs = await Doctor.find();
        // res.json({ drs });
        const countPromise = Doctor.estimatedDocumentCount(query);
        const itemsPromise = Doctor.find().limit(ITEMS_PER_PAGE).skip(skip);
        

        const [count,items]  = await Promise.all([countPromise,itemsPromise]);
        
        const pageCount = count / ITEMS_PER_PAGE;
        
        res.json({
            pagination: {
                count,
                pageCount
            },
            items
        });



    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

// get all the Members
router.get('/getmembers', fetchUser, async (req, res) => {
    try {
        const member = await Member.find();
        res.json({ member });
    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

// All new doctors
router.get('/getnewdrs', fetchUser, async (req, res) => {
    const manager = req.user.id
    try {
        // console.log("getnewdrs")
        // const drs = await Doctor.find({$and:[{status:"Rejected"},{mrID:userID}]})

        const drs = await Doctor.find({ $and: [{ status: "New" },{managerID:manager}] })
        // db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
        // db.contributor.find({$or: [{branch: "ECE"}, {joiningYear: 2017}]}).pretty()
        res.json({ drs });
    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})


// send reject message with respect to that doc 
// with reject message chnage the state to rejected 
router.put('/setrejectmessage/:id', fetchUser, async (req, res) => {
    const message = req.body.message;
    const doctorID = req.params.id
    try {

        // check if doctors with the id exists or not
        let d = await Doctor.findById(doctorID)
        if (!d) { return res.status(404).send("Not Found") }

        const userID = req.user.id
        const loggedInUser = await Member.findById(userID);
        const loggedInUserID = loggedInUser.id
        const loggedInUserrole = loggedInUser.role
        const todayDate = Date.now();
        // we only want to update the status of the doctor request to approved
        if (loggedInUserrole == 1 || loggedInUserrole == 3 || loggedInUserrole == 2) {
            // if the loggedin user is manager then he is allowd to update the status of doctor to approved or rejected
            // find by id and update
            try {
                let status = "Rejected"
                d = await Doctor.findByIdAndUpdate(doctorID, { $set: { status: status, verifiedBy: loggedInUserID, verifiedOn: todayDate, rejectmessage: message } })
                res.json({ d });
            } catch (error) {
                return res.status(401).json({ error: "Not Allowed" });
            }
        }
        // else if (loggedInUserrole == 2 || loggedInUserrole == 3) {
        //     // the current user is tech member
        //     // is is allowed to make the status to `certification`
        //     try {
        // d = await Doctor.findByIdAndUpdate(doctorID, { $set: { status: toChangeTo, updatedBy: loggedInUserID, verifiedOn: todayDate } })
        //         res.json({ d });
        //     } catch (error) {
        //         return res.status(401).json({ error: "Not Allowed" });
        //     }
        // }
        else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})



// show all the approved doctors to tech team
// check if the curretn user is tech or admin or not 
router.get("/approveddrs", fetchUser, async (req, res) => {
    let userID = req.user.id;

    try {
        // get the role of the id 
        let userDetails = await Member.findById(userID);
        let userrole = userDetails.role

        if (userrole == 2 || userrole == 3 || userrole == 1) {
            // show all the docs with approved status
            const items = await Doctor.find({ status: "Approved" })
            res.json({ items });
        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

// show all the Done websites
// websites which have given the url and all the stuffs done
// check if the curretn user is tech or admin or not 
router.get("/donewebsites", fetchUser, async (req, res) => {
    let userID = req.user.id;

    try {
        // get the role of the id 
        let userDetails = await Member.findById(userID);
        let userrole = userDetails.role


        // show all the docs with approved status
        const doctorsDone = await Doctor.find({ status: "Done" })
        res.json({ doctorsDone });

    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

// show all the verfied docs websites page and there we will add new filed to db as webisteurl
// check if the curretn user is tech or admin or not 
router.get("/verifieddrs", fetchUser, async (req, res) => {
    let userID = req.user.id;

    try {
        // get the role of the id 
        let userDetails = await Member.findById(userID);
        let userrole = userDetails.role

        if (userrole == 3 || userrole == 1) {
            // show all the docs with approved status
            const doctorsApproved = await Doctor.find({ status: "Verified" })
            res.json({ doctorsApproved });
        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

// check if the curretn user is tech or admin or not 
// add webiste to the respective doctor in the website filed 
// the body will contain the website new website
router.put("/addwebsite/:id", fetchUser, async (req, res) => {
    let userID = req.user.id;
    const website = req.body.website;
    let doctorID = req.params.id;
    // console.log("inside addwebsite")
    // console.log(website + " website")
    try {

        // check if doctor with thr id exists or it 
        let d = await Doctor.findById(doctorID)
        if (!d) { return res.status(404).send("Not Found") }

        // get the role of the id 
        let userDetails = await Member.findById(userID);
        let userrole = userDetails.role

        if (userrole == 3 || userrole == 1) {
            // if yes then 
            // add that body data to the webiste filed
            try {
                let done = "Done"
                d = await Doctor.findByIdAndUpdate(doctorID, { $set: { status: done, website: website } })
                res.send({ d })
                // d = await Doctor.findByIdAndUpdate(doctorID, { $set: { status: toChangeTo, verifiedBy: loggedInUserID, verifiedOn: todayDate } })
                // res.json({ d });
            }
            catch (error) {
                // console.log(error);
                res.status(500).json({ error: "Internal server error ocured" })
            }
        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (e) {
        // // console.log(e)
        // console.log(e);
        res.status(500).json({ error: "Internal server error ocured" })
    }
})




// show all thing to admin and all live websites to admin and tech 


// show all the not approved doctor to the mr
router.get("/notapproveddrs", fetchUser, async (req, res) => {
    let userID = req.user.id;

    try {
        // get the role of the id 
        let userDetails = await Member.findById(userID);
        let userrole = userDetails.role

        if (userrole == 0 || userrole == 3 || userrole == 1 || userrole == 2) {
            // show all the docs with approved status
            const drs = await Doctor.find({ status: "Rejected" })
            res.json({ drs });
        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

// show all the not approved doctor of respective mr
router.get("/notapproveddrsmr", fetchUser, async (req, res) => {
    let userID = req.user.id;
    // console.log("inside not approved dr mr")

    try {
        // get the role of the id 
        let userDetails = await Member.findById(userID);
        // console.log(userDetails)
        let userrole = userDetails.role

        if (userrole == 0 || userrole == 3 || userrole == 1 || userrole == 2) {
            // show all the docs with approved status
            // const drs = await Doctor.find({ mrId:userDetails._id })
            const drs = await Doctor.find({$and:[{status:"Rejected"},{mrID:userID}]})
            // {$and:[{name:"Molu"},{marks:50}]}
            console.log("notapproveddrsmr")
            // console.log(drs)
            res.json({ drs });
            
        } else {
            return res.status(401).json({ error: "Not Allowed" });
        }
    } catch (e) {
        // // console.log(e)
        res.status(500).json({ error: "Internal server error ocured" })
    }
})

module.exports = router;

