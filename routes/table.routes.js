const {Router} = require('express');
const router = Router();
const User = require('../models/User');

router.get(
    '/loadtable',
    async(req, res) => {

        try {
            const usersList = await User.find();

            // Тут передается пароль, позже исправить
            res.json(usersList);

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

module.exports = router;