let endpoints = {

    midddleware: "Header name auth-token which contanns userID",
    userLogin: "If any user needs to login or not",

    "/api/auth/createadmin": {
        body: { name, email, password, id },
        middleware: "no",
        userLogin: "no",
        method: "post",
        use: "Create new admin user with id as provided",
        return: "auth token"
    },
    "/api/auth/createmember": {
        body: { name, email, password, role },
        middleware: "yes",
        userLogin: "yes",
        method: "post",
        use: "Create manager or tech based on role",
        return: "auth token"
    },
    "/api/auth/members": {
        body: { },
        middleware: "no",
        userLogin: "no",
        method: "get",
        use: "Testing purpose -> return all the members",
        return: "all memebers object"
    },
    "/api/auth/login": {
        body: {  email, password },
        middleware: "no",
        userLogin: "no",
        method: "post",
        use: "Login user",
        return: "auth token"
    },
    "/api/auth/getmemberdetails": {
        body: {   },
        middleware: "yes",
        userLogin: "yes",
        method: "post",
        use: "Get current loggedin member details",
        return: "user object"
    },
    "/api/auth/getmemberrole": {
        body: {   },
        middleware: "no",
        userLogin: "no",
        method: "post",
        use: "Login user role",
        return: "object conatining role of curr user"
    },
    "/api/auth/createdr": {
        body: {  "all redired fields :)"},
        middleware: "yes",
        userLogin: "yes",
        method: "post",
        use: "Create new doctor ",
        return: "object containing doctor details and ID"
    },
    "/api/auth/updatedrstatus/:id": {
        body: {  tochange },
        middleware: "yes",
        userLogin: "yes",
        method: "post",
        use: "Update form status of doctor",
        return: "auth token"
    },
    "/api/auth/getdrmr": {
        body: {  },
        middleware: "yes",
        userLogin: "yes",
        method: "get",
        use: "get all the doctor of specific mr",
        return: "doctor json object"
    },
    "/api/auth/getdrs": {
        body: {  },
        middleware: "yes",
        userLogin: "yes",
        method: "get",
        use: "get all doctors",
        return: "auth token"
    },
    "/api/auth/approveddrs": {
        body: {  },
        middleware: "yes",
        userLogin: "yes",
        method: "get",
        use: "show all the approved doctors to tech team",
        return: "doctors object"
    },
    "/api/auth/notapproveddrs": {
        body: {  },
        middleware: "yes",
        userLogin: "yes",
        method: "get",
        use: "show all the not approved doctor to the mrs",
        return: "doctors object"
    },
    "/api/auth/notapproveddrs": {
        body: {  },
        middleware: "yes",
        userLogin: "yes",
        method: "get",
        use: "show all the not approved doctor to the mrs",
        return: "doctors object"
    },
}

