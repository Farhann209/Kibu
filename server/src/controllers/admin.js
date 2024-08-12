const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const registerAdmin = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;
    
    const phoneExist = await Admin.exists({ phoneNumber: req.body.phoneNumber });
    if (phoneExist) {
      return res.status(409).json({ msg: "Phone Number is taken!" });
    }
    
    await Admin.create(req.body);
    return res.json({ msg: "Admin registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ phoneNumber: req.body.phoneNumber });
    if (!admin) {
      return res.status(401).json({ msg: "Phone Number is not registered." });
    }
    
    const IsMatched = await bcrypt.compare(req.body.password, admin.password);
    if (IsMatched) {
      const token = jwt.sign({ phoneNumber: admin.phoneNumber }, process.env.SECRET_KEY);
      res.json({ msg: "Authorized", token, admin });
    } else {
      res.status(401).json({ msg: "Invalid password" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }

  
};

module.exports = { registerAdmin, loginAdmin };
