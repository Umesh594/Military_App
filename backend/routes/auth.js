const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res)=>{
    const {name,email,password,role,base} = req.body;
    const hashed = await bcrypt.hash(password,10);
    const user = new User({name,email,password:hashed,role,base});
    await user.save();
    res.send(user);
});

router.post('/login', async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).send('User not found');
    const valid = await bcrypt.compare(password,user.password);
    if(!valid) return res.status(400).send('Invalid password');
    const token = jwt.sign({id:user._id,role:user.role,base:user.base},process.env.JWT_SECRET);
    res.send({token});
});

module.exports = router;