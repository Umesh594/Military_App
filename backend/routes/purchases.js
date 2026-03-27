const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const {authMiddleware, roleMiddleware} = require('../middleware/auth');
router.post('/', authMiddleware, roleMiddleware(['ADMIN','LOGISTICS']), async (req,res)=>{
    console.log("PURCHASE:", req.body);
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.send(purchase);
});

router.get('/', authMiddleware, async (req,res)=>{
    const data = await Purchase.find();
    res.send(data);
});

module.exports = router;