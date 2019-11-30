const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//Post Model
const User = require('../../models/User')


//@Route POST api/user
//@Description Authenticate user
//@Access Public
router.post('/user', (req,res) => {
  const { email, password} = req.body;

    if( !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exists'});

           //validate password
           bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 }, 
                    (err, token) => {
                        if(err) throw err;
                        res.json({ 
                            token,
                            user: {
                                username: user.usernamename,
                                id: user.id,
                                email: user.email
                            }
                        });
                    }
                )
 
            })
        })
});

//@Route GET api/user
//@Description get user data
//@Access private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
});



module.exports = router;