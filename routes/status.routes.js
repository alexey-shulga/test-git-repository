const {Router} = require('express');
const router = Router();
const User = require('../models/User');

router.post(
    '/unblockuser',
    async(req, res) => {

        try {
            const {selectedUsers, auth} = req.body;
            
            try{
                const currentUser = await User.findById(auth.userID);
                if (!currentUser.userStatus) {
                    return res.json({message: 'no access'});
                }
            } catch (e) {
                return res.json({message: 'no access'});
            }


            for (let i = 0; i < selectedUsers.length; i++) {
                await User.updateOne({email: selectedUsers[i].email}, {$set: {userStatus: true}});
            }

            res.json({message: 'users loaded'});

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

router.post(
    '/blockuser',
    async(req, res) => {

        try {
            const {selectedUsers, auth} = req.body;

            try{
                const currentUser = await User.findById(auth.userID);
                if (!currentUser.userStatus) {
                    return res.json({ message: 'no access' });
                }
            } catch (e) {
                return res.json({message: 'no access'});
            }

            for (let i = 0; i < selectedUsers.length; i++) {
                await User.updateOne({email: selectedUsers[i].email}, {$set: {userStatus: false}});
            }

            res.json({message: 'users loaded'});

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

router.post(
    '/deleteuser',
    async(req, res) => {

        try {
            const {selectedUsers, auth} = req.body;
            
            try{
                const currentUser = await User.findById(auth.userID);
                if (!currentUser.userStatus) {
                    return res.json({message: 'no access'});
                }
            } catch (e) {
                return res.json({message: 'no access'});
            }

            for (let i = 0; i < selectedUsers.length; i++) {
                await User.deleteOne({email: selectedUsers[i].email});
            }

            res.json({message: 'users loaded'});

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

module.exports = router;