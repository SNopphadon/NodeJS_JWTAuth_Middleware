const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        const { username, email, password, fname, lname } = req.body;
        // Call the User model to create a new user
        await User.create(username, email, password, fname, lname);

        console.log('User registered successfully!');
        res.redirect('/login');
      } catch (error) {
        //console.log('Request Body:', req.body);
        console.error('Error creating user:', error.message);
    
        // Handle and display errors using req.flash or other error handling mechanisms
        req.flash('error', error.message);
        req.flash('data',req.body)
        return res.redirect('/register');
      }
    };
