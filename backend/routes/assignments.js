const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const {authMiddleware, roleMiddleware} = require('../middleware/auth');

router.post('/', authMiddleware, roleMiddleware(['ADMIN','COMMANDER']), async (req,res)=>{
    console.log("ASSIGNMENT:", req.body);

    const assignment = new Assignment(req.body);
    await assignment.save();

    res.send(assignment);
});

router.get('/', authMiddleware, async (req,res)=>{
    const data = await Assignment.find();
    res.send(data);
});

router.put('/:id/expended', authMiddleware, async (req,res)=>{
    const updated = await Assignment.findByIdAndUpdate(
        req.params.id,
        { expended: true },
        { new: true }
    );

    res.send(updated);
});

module.exports = router;