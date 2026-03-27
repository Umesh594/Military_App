const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');
const {authMiddleware, roleMiddleware} = require('../middleware/auth');

router.post('/', authMiddleware, roleMiddleware(['ADMIN','LOGISTICS']), async (req,res)=>{
    console.log("TRANSFER:", req.body);
    const transfer = new Transfer(req.body);
    await transfer.save();
    res.send(transfer);
});

router.get('/', authMiddleware, async (req,res)=>{
    const data = await Transfer.find();
    res.send(data);
});

module.exports = router;