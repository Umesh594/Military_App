const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Transfer = require('../models/Transfer');
const Assignment = require('../models/Assignment');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    const { base, asset, startDate, endDate } = req.query;

    let purchaseFilter = {};
    let transferFilter = {};
    let assignmentFilter = {};

    if (base) {
        purchaseFilter.base = base;
        transferFilter.$or = [{ fromBase: base }, { toBase: base }];
        assignmentFilter.base = base;
    }

    if (asset) {
        purchaseFilter.asset = asset;
        transferFilter.asset = asset;
        assignmentFilter.asset = asset;
    }

    if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999); 

    purchaseFilter.date = { $gte: start, $lte: end };
    transferFilter.date = { $gte: start, $lte: end };
    assignmentFilter.date = { $gte: start, $lte: end };
}

    const purchases = await Purchase.find(purchaseFilter);
    const transfers = await Transfer.find(transferFilter);
    const assignments = await Assignment.find(assignmentFilter);

    let purchaseTotal = purchases.reduce((sum, p) => sum + p.quantity, 0);

    let transferIn = 0;
    let transferOut = 0;

    transfers.forEach(t => {
        if (!base || t.toBase === base) transferIn += t.quantity;
        if (!base || t.fromBase === base) transferOut += t.quantity;
    });

    let assigned = assignments.reduce((sum, a) => sum + a.quantity, 0);
    let expended = assignments
        .filter(a => a.expended)
        .reduce((sum, a) => sum + a.quantity, 0);

    const netMovement = purchaseTotal + transferIn - transferOut;

    let openingBalance = 0;

    if (startDate) {
        const prevPurchases = await Purchase.find({
            ...purchaseFilter,
            date: { $lt: new Date(startDate) }
        });

        const prevTransfers = await Transfer.find({
            ...transferFilter,
            date: { $lt: new Date(startDate) }
        });

        let prevPurchaseTotal = prevPurchases.reduce((sum, p) => sum + p.quantity, 0);

        let prevTransferIn = 0;
        let prevTransferOut = 0;

        prevTransfers.forEach(t => {
            if (!base || t.toBase === base) prevTransferIn += t.quantity;
            if (!base || t.fromBase === base) prevTransferOut += t.quantity;
        });

        openingBalance = prevPurchaseTotal + prevTransferIn - prevTransferOut;
    }

    const closingBalance = openingBalance + netMovement - assigned;

    res.send({
        openingBalance,
        closingBalance,
        netMovement,
        purchases: purchaseTotal,
        transferIn,
        transferOut,
        assigned,
        expended
    });
});

module.exports = router;