const express = require('express')
const route = express.Router()
const favHandler = require('../router_handler/fav')


route.post('/addFav', favHandler.addFav)
route.get('/getFav', favHandler.getFav)

module.exports = route