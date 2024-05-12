const express = require('express');

const routes = express.Router();

const admin = require('../controller/admin.controller');

const baseUrl = "/admin";

const verifyJWT = require('../middelware/verify-jwt');

/* routes.post(baseUrl, admin.saveAdminDetails); */

routes.post(baseUrl, admin.adminLogin);

routes.get(baseUrl, verifyJWT, admin.getAdminDetails);

module.exports = routes;