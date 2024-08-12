const { Router } = require('express');
const { registerAdmin, loginAdmin } = require("../controllers/admin");

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
