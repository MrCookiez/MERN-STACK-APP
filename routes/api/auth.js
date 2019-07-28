const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/User');

// @route       POST api/auth
// @desc        Authenticate user & get token
// @access      Public
router.get('/', auth, async (req, res) => {
    // Get user by ID and exclude the password from the json response
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Password is required'
        ).exists()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        // Destructuring request object
        const {
            email,
            password
        } = req.body;

        try {
            // Check if user exist
            let user = await User.findOne({
                email
            });

            if (!user) {
                res.status(400).json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                });
            }
            // Check the store pass with the user input
            const isMatch = await bcrypt.compare(password, user.password);
            // We use same error message so we can avoid users
            // to see if there are an existing user with current name/password (security reason)
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'), {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;