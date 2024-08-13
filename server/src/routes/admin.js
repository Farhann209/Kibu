const { Router } = require('express'); // Import the Router class from the Express framework.
const { registerAdmin, loginAdmin } = require("../controllers/admin"); // Import the functions registerAdmin and loginAdmin from the admin controller.

const router = Router(); // Create a new Router instance to define routes.

// Define a POST route for registering an admin.
// When a POST request is made to the '/register' endpoint, the registerAdmin function from the controller is executed.
router.post('/register', registerAdmin);

// Define a POST route for admin login.
// When a POST request is made to the '/login' endpoint, the loginAdmin function from the controller is executed.
router.post('/login', loginAdmin);

module.exports = router; // Export the router so it can be used in other parts of the application.
