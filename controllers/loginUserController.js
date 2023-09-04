const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const config = require('../Config/dbConfig');
module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        //console.log(req.body)
        const pool = await sql.connect(config);

        const result = await pool
            .request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM tb_account WHERE username = @username');

        const user = result.recordset[0];
        if (result.recordset.length === 0) {
            // User not found
            console.log('Invalid username or password.');
            req.flash('error', 'Invalid username or password.');
            return res.redirect('/login');
        }
        const hashedPasswordFromDB = user.password;
        const isPasswordValid = await bcrypt.compare(password, hashedPasswordFromDB);

        if (!isPasswordValid) {
            // Incorrect password
            console.log('Invalid password.');
            req.flash('error', 'Invalid password.');
            return res.redirect('/login');
        }
        // Record the login datetime
        await pool
            .request()
            .input('userId', sql.Int, user.id)
            .query('UPDATE tb_account SET LastLogin = GETDATE() WHERE id = @userId');

        const token = jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '1h' });
        // Save the token to the database
        await pool
            .request()
            .input('user_id', sql.Int, user.id)
            .input('token', sql.NVarChar, token)
            .query('INSERT INTO tb_usertoken (user_id, token) VALUES (@user_id, @token)');
        // Set userId in the session
        req.session.token = token;
        req.session.userId = user.id;
        res.redirect('/home');

    } catch (error) {
        //console.error('Error during login:', error);
        req.flash('error', error.message);
        req.flash('data',req.body)
        res.redirect('/login');
    }
};
