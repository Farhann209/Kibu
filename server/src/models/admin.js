const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  phoneNumber: String,
  fullName: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
