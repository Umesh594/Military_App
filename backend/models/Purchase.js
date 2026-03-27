const mongoose = require('mongoose');
const purchaseSchema = new mongoose.Schema({
    asset: String,
    quantity: Number,
    base: String,
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Purchase', purchaseSchema);