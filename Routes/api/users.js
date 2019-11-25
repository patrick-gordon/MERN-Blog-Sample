const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//Post Model
const User = require('../../models/User')


//@Route POST api/users
//@Description Register new User
//@Access Public
router.post('/', (req,res) => {
  const { name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields'});
    }

    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ message: 'User already exists'});

            const newUser = new User({
                name,
                email,
                password
            });

            //HASH and SALT
            bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
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
            })
        })
});




module.exports = router;