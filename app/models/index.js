const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.productos = require("./product.model")
db.productadms = require("./productAdm.model")
db.ROLES = ["user", "admin"];

module.exports = db;