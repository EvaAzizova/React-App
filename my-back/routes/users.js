const express = require('express');
const router = express.Router();
let users = require('./User');
const mysql = require("mysql")


const db = mysql.createConnection({
    host: 'localhost',
    user: 'ROOT',
    password: 'PASSWORD',
    database: 'login-db'
});



// get all users
router.get("/", (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }

        res.json(results);  // Send the full results array
    });
});


// get by id
router.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    db.query('SELECT * FROM users WHERE id = ?', [userId], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }

        if (results.length === 0) {
            return res.status(400).send('No user found with this ID');
        } else {
            res.json(results[0]); // Send the first result, as we expect only one row for a given ID
        }
    });
});



// delete user by id
router.delete("/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    db.query('DELETE FROM users WHERE id = ?', [userId], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }

        if (result.affectedRows === 0) {
            return res.status(400).send('No user found with this ID');
        } else {
            res.json({
                msg: "User Deleted."
            });
        }
    });
})



// register user
router.post("/register", (req, res) => {
    // Extract updated fields from the request body
    const { name, email, password } = req.body;

    // check in db the user is exist
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error)
        }

        if (result.length > 0) {
            return res.status(409).json({
                error: true,
                message: 'This email is already in use'
            });
        } else if (!password || password.trim().length <= 0) {
            return res.status(400).json({
                error: true,
                message: 'Password is empty!'
            });

        }

        // insert into the db
        db.query('INSERT INTO users SET?', { name: name, email: email, password: password, registration_time: new Date(), status: 'active' }, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: true,
                    message: 'Database error during registration'
                });

            } else {
                return res.status(201).json({
                    success: true,
                    message: 'User registered!'
                });

            }
        })
    })
})


// update user
router.put("/:id", (req, res) => {
    const userId = req.params.id;
    // Extract updated fields from the request body
    const { name, email, password, status, last_login_time } = req.body;

    // This SQL query string will be used to update the user
    const updateUserQuery = ` UPDATE users 
                            SET name = ?, email = ?, password = ?, status = ?
                            WHERE id = ? `;

    db.query(updateUserQuery, [name, email, password, status, userId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Server Error');
        }

        // Check if any rows were affected (updated)
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User updated successfully');
    });
});


// Login user by
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log(email);
        return res.status(400).json({
            error: true,
            message: "Please provide an email and password."
        });
    }

    // Query the database to find the user by email and check the user is active
    db.query('SELECT * FROM users WHERE email = ? AND status = "active"', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                error: true,
                message: "Server error during login"
            });
        }

        // Check if the email exists in the database and if the provided password matches
        // For a production system, we should store and compare hashed passwords
        // using a library like bcrypt.
        if (results.length > 0 && password === results[0].password) {
            // Update the last_login_time in the database for this user
            const updateLoginTimeQuery = 'UPDATE users SET last_login_time = NOW() WHERE email = ?';
            db.query(updateLoginTimeQuery, [email], (error, updateResults) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        error: true,
                        message: "Server error updating login time"
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Login successful!"
                });
            });

        } else {
            res.status(401).json({
                error: true,
                message: "Email or password is incorrect."
            });
        }
    });
});



module.exports = router;
