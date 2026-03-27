const mongoose = require('mongoose');
const assignmentSchema = new mongoose.Schema({
    asset: String,
    quantity: Number,
    base: String,
    assignedTo: String,
    expended: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Assignment', assignmentSchema);