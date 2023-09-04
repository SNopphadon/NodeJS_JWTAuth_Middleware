const sql = require('mssql');
const config = require('../Config/dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = {
    create: async (username, email,password, fname, lname) => {
        try {
            // Connect to the SQL Server database
            const pool = await sql.connect(config);
            if (!username) {
                throw new Error('Username is required.');
            }
            if (!password) {
                throw new Error('Password is required.');
            }
            if (!email) {
                throw new Error('Email is required.');
            }
            if (!fname) {
                throw new Error('Firstname is required.');
            }
            if (!lname) {
                throw new Error('Lastname is required.');
            }

            // Check if the username already exists
            const existingUser = await pool
            .request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM tb_account WHERE username = @username');

            if (existingUser.recordset.length > 0) {
            // Username already exists
            throw new Error('Username already exists.');
            }

            // Hash the password
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            // Perform the INSERT operation
            const result = await pool
                .request()
                .input('username', sql.VarChar, username)
                .input('password', sql.Text, hashedPassword)
                .input('email', sql.VarChar, email)
                .input('fname', sql.VarChar, fname)
                .input('lname', sql.VarChar, lname)
                .query('INSERT INTO tb_account (username, email, password, fname, lname) VALUES (@username, @email, @password, @fname, @lname)');

            // Close the connection
            sql.close();

            // Return the result or any necessary information
            return result;
        } catch (error) {
            throw error;
            //console.error('Error', error);
            //res.status(500).json({ message: 'An error occurred' });
        }
    },
};

module.exports = User;

