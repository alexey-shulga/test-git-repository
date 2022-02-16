const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config  = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult, body} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Invalid E-mail').isEmail(),
        check('password', 'Minamal length is 1 symbols').isLength({min: 1})
    ],
    async(req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid registration data.'
                })
            }

            const {email, password, name, registrationDate, lastLoginDate, userStatus} = req.body;

            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: 'E-mail exist, try other.'});
            }
            
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = new User({email, password: hashPassword, name, registrationDate, lastLoginDate, userStatus});
            await newUser.save();

            res.status(201).json({message: 'User created.'});

        } catch(e) {
            console.log(e.message);
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Input correct E-mail').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async(req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login data.'
                })
            }

            const {email, password, lastLoginDate} = req.body;
            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'Wrong E-mail or password. Try again.'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Wrong E-mail or password. Try again.'});
            }

            if (!user.userStatus) {
                return res.status(400).json({message: 'Account has been blocked.'});
            }

            await User.updateOne({email: email}, {$set: {lastLoginDate: lastLoginDate}});

            const token = jwt.sign(
                {userID: user.id, userNAME: user.name},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            res.json({token, userID: user.id, userNAME: user.name});

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

module.exports = router;