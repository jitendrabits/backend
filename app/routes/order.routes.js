const express = require('express');

const routes = express.Router();

const order = require('../controller/order.controller');

const baseUrl = "/order";

const verifyJWT = require('../middelware/verify-jwt');

routes.get(baseUrl + '/:userId', verifyJWT, order.getOrderHistory);

routes.route(baseUrl).get(order.getOrdersList);
// console.log(order.getOrdersList)

routes.route(baseUrl + "-details" + '/:orderId').get(order.getOrdersDetails);

module.exports = routes;