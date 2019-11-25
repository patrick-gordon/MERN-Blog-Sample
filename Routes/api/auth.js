const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//Post Model
const User = require('../../models/User')


//@Route POST api/auth
//@Description Authenticate user
//@Access Public
router.post('/', (req,res) => {
  const { email, password} = req.body;

    if( !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields'});
    }

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ message: 'User does not exists'});

           //validate password
           bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({message: 'Invalid credentails'});

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 }, 
                    (err, token) => {
                        if(err) throw err;
                        res.json({ 
                            token,
                            user: {
                                name: user.name,
                                id: user.id,
                                email: user.email
                            }
                        });
                    }
                )
 
            })
        })
});

//@Route GET api/auth/user
//@Description get user data
//@Access private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
});



module.exports = router;