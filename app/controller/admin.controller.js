const model = require('../model/db');

const Admin = model.admin;

const encPassword = require('../middelware/enc-password');

const decPassword = require('../middelware/dec-password');

const createJwtToken = require('../middelware/create-jwt');

exports.getAdminDetails = (req, res, next) => {

    Admin.find().then(response => {

        const adminDetails = response[0];

        const adminData = {
            id: adminDetails._id,
            name: adminDetails.name,
            email: adminDetails.email,
            profile_image: adminDetails.profile_image,
        };

        res.status(200).send({
            message: "Admin Details fetached successfully",
            status: true,
            data: adminData
        });

    }).catch((err) => {
        res.status(400).send({
            message: "Something went wrong " + err.message,
            status: false,
            data: [],
        });
    });

};

exports.saveAdminDetails = async (req, res, next) => {

    let password = await encPassword("Test@123");

    const data = new Admin({
        name: "Admin Dashboard",
        email: "admin@gmail.com",
        password: password,
        profile_image: "",
    });

    data.save().then(response => {
        res.status(200).send({
            message: "Admin Created successfully",
            status: true,
            data: response
        });
    }).catch((err) => {
        res.status(400).send({
            message: "Something went wrong " + err.message,
            status: false,
            data: [],
        });
    });

};

exports.adminLogin = async (req, res, next) => {

    const data = req.body;

    if (data.email != null && data.email != "" && data.password != null && data.password != "") {

        const loginEmail = {
            email: data.email,
        };

        Admin.find(loginEmail).then(async response => {
            if (response.length > 0) {

                const adminDetails = response[0];

                const adminData = {
                    id: adminDetails._id,
                    name: adminDetails.name,
                    email: adminDetails.email,
                    profile_image: adminDetails.profile_image,
                }

                const checkPassword = await decPassword(data.password, adminDetails.password);

                if (checkPassword === true) {

                    const token = await createJwtToken(adminData);

                    res.status(200).send({
                        message: "Admin Login Successfully",
                        status: true,
                        data: adminData,
                        jwt_token: token,
                    });

                } else {

                    res.status(503).send({
                        message: "Please Enter Valid Password",
                        status: false,
                        data: [],
                    });
                }

            } else {

                res.status(503).send({
                    message: "Admin Not Exist. Please Enter Valid Email",
                    status: false,
                    data: [],
                });

            }

        }).catch((err) => {

            res.status(400).send({
                message: "Something went wrong " + err.message,
                status: false,
                data: [],
            });

        });

    } else {
        res.status(503).send({
            message: "Please Provide Email address & Password",
            status: false,
            data: [],
        });
    }

};